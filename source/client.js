// import <
const {randomBytes} = require('crypto');
const {

   Routes,
   Client,
   IntentsBitField

} = require('discord.js');

const database = require('./database.js');
const show = require('./command/show.js');
const share = require('./command/share.js');
const update = require('./command/update.js');
const remove = require('./command/remove.js');
const decrypt = require('./command/decrypt.js');
const encrypt = require('./command/encrypt.js');

// >


class client {

   constructor(pToken) {

      // setup <
      // initialize <
      this.token = pToken;
      this.guildId = process.env.guildId;
      this.channelId = process.env.channelId;
      this.applicationId = process.env.applicationId;

      this.client = new Client({

         rest : {version : '10'},
         intents : [

            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent

         ]

      });
      this.database = new database({

         pClient : this.client,
         pChannelId : this.channelId
         
      });

      // >

      // commands <
      this.commands = {

         encrypt : new encrypt(this.database),
         decrypt : new decrypt(this.database),
         remove : new remove(this.database),
         update : new update(this.database),
         share : new share(this.database),
         show : new show(this.database)

      };

      // >

   }


   async message({

      pKind,
      pTitle,
      pDescription,

      pChannel = undefined,
      pThumbnail = undefined,
      pFooterText = undefined,
      pInteraction = undefined

   }) {
      
      console.log('message', pKind, pTitle, pDescription)

      return {

         'member' : async () => {

            await pChannel.send({

               embeds : [{

                  title : `\`${pTitle}\``,
                  thumbnail : {url : pThumbnail},
                  description : `\`${pDescription}\``

               }]

            });

         },
         'interaction' : async () => {

            await pInteraction.reply({

               ephemeral : true,
               embeds : [{

                  title : pTitle,
                  description : pDescription,
                  footer : {text : pFooterText}

               }]

            });

         }

      }[pKind]();

   }


   listen() {

      this.client.on('interactionCreate', async (interaction) => {

         let result = undefined;
         let tag = (interaction.user.tag);
         let users = await this.database.getMembers();

         // if (authentic) <
         if (interaction.user.id == users[tag].id) {

            let action = interaction.options.get('action')?.value;
            console.log('action 1', interaction.options.get('action')); // remove
            let content = interaction.options.get('content')?.value;
            console.log('content', interaction.options.get('content')); // remove
            let file = interaction.options.get('file')?.value + '.json';
            let recipient = interaction.options.get('recipient')?.value;
            console.log('recipient', recipient); // remove

            console.log('client args', tag, file, users, action, content, recipient); // remove

            // try (if valid input) <
            // except (then invalid input) <
            try {

               console.log('interaction command name', interaction.commandName); // remove
               result = await {

                  // false (if new file) <
                  // true (then existing file) <
                  false : {

                     'show' : this.commands.show,
                     'encrypt' : this.commands.encrypt

                  }[interaction.commandName],
                  true : {

                     'share' : this.commands.share,
                     'remove' : this.commands.remove,
                     'update' : this.commands.update,
                     'decrypt' : this.commands.decrypt

                  }[interaction.commandName]

                  // >

               }[await this.database.exists({pDir : tag, pName : file})].run({

                  pTag : tag,
                  pFile : file,
                  pUsers : users,
                  pAction : action,
                  pContent : content,
                  pKey : users[tag].key,
                  pRecipient : recipient,
                  pFilePath : `${tag}/${file}`,
                  oRemove : this.commands.remove,

               });
            
            } catch (error) {console.log('client error', error); result = false;}

            // >

            console.log('client result', result); // remove


            await this.message({

               pKind : 'interaction',
               pInteraction : interaction,
               pFooterText : result?.footer,
               pTitle : {

                  true : tag,
                  false : file.slice(0, -5)

               }[['show'].includes(interaction.commandName)],
               pDescription : {

                  // true (if decrypt/show) <
                  // false (then encrypt/remove/share/update) <
                  true : {

                     false : result?.content,
                     true : `${file.slice(0, -5)} does not exist.`

                  }[result == false],
                  false : {

                     false : `Failed to ${interaction.commandName}.`,
                     undefined : `${action || interaction.commandName} was successful.`

                  }[result]

                  // >

               }[['decrypt', 'show'].includes(interaction.commandName)]

            });

         }

         // >   
               
      });
      this.client.on('guildMemberAdd', async (member) => {

         // if (new member) <
         if (await this.database.checkMember(member.user.tag)) {

            await this.database.setDir({pDir : member.user.tag});
            await this.message({

               pKind : 'member',
               pTitle : member.user.tag,
               pThumbnail : member.user.displayAvatarURL(),
               pChannel : await this.client.channels.cache.get(this.channelId),
               pDescription : [

                  member.user.id,
                  randomBytes(this.commands['encrypt'].keySize).toString('hex')

               ].join('\n')

            });

         }

         // >

      });

   }


   async run() {

      let commands = Object.values(this.commands);
      let members = await this.database.getDir({});

      this.client.login(this.token);
      this.client.rest.put(
 
         Routes.applicationGuildCommands(

            this.applicationId,
            this.guildId

         ),
         {body : (commands.map(c => c.context(members)))}

      );

      this.listen();
      
   }

}


// export <
module.exports = client;

// >
