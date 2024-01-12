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

   constructor({

      pToken,
      pGuildId,
      pChannelId,
      pMaxMembers,
      pDataFilepath,
      pApplicationId

   }) {

      // setup <
      this.token = pToken;
      this.guildId = pGuildId;
      this.channelId = pChannelId;
      this.maxMembers = pMaxMembers;
      this.dataFilepath = pDataFilepath;
      this.applicationId = pApplicationId;

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
         pChannelId : this.channelId,
         pMaxMembers : this.maxMembers,
         pDataFilepath : this.dataFilepath
         
      });

      // >

      // commands <
      this.commands = {

         encrypt : new encrypt(this.database),
         decrypt : new decrypt(this.database),
         remove : new remove(this.database),
         update : new update(this.database),
         share : new share(this.database),
         show : new show(this.database),

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

         var result = undefined;
         let tag = interaction.user.tag;
         let users = await this.database.getMembers();

         // if (authentic) <
         if (interaction.user.id == users[tag]['id']) {

            let action = interaction.options.get('action')?.value;
            let content = interaction.options.get('content')?.value;
            let receiver = interaction.options.get('receiver')?.value;
            let file = interaction.options.get('file')?.value + '.json';

            // try (if valid input) <
            // except (then invalid input) <
            try {

               result = await {

                  // if (new file) <
                  // else (then existing file) <
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
                  pUsers : users,
                  pAction : action,
                  pContent : content,
                  pReceiver : receiver,
                  pKey : users[tag].key,
                  pFile : tag + '/' + file

               });
            
            } catch (error) {result = false;}

            // >

            await this.message({

               pKind : 'interaction',
               pTitle : file.slice(0, -5),
               pInteraction : interaction,
               pFooterText : result?.footer,
               pDescription : {

                  undefined : result?.content,
                  false : {

                     false : `Failed to ${interaction.commandName}.`,
                     undefined : `${interaction.commandName} was successful.`

                  }[result]

               }[this.commandName == 'decrypt']

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

      this.client.login(this.token);
      this.client.rest.put(
 
         Routes.applicationGuildCommands(

            this.applicationId,
            this.guildId

         ),
         {body : (Object.values(this.commands)).map(i => i.context())}

      );

      this.listen();
      
   }

}


// export <
module.exports = client;

// >