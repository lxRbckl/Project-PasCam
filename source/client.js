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

         'encrypt' : new encrypt(),
         'decrypt' : new decrypt(),
         'remove' : new remove(),
         'update' : new update(),
         'share' : new share(),
         'show' : new show()

      };

      // >

   }


   async message({

      pKind,
      pTitle,
      pContent,

      pChannel = undefined,
      pThumbnail = undefined,
      pInteraction = undefined

   }) {
      
      return {

         'member' : async () => {

            await pChannel.send({

               embeds : [{

                  title : `\`${pTitle}\``,
                  thumbnail : {url : pThumbnail},
                  description : `\`${pContent}\``

               }]

            });

         },
         'interaction' : async () => {

            await pInteraction.reply({

               ephemeral : true,
               embeds : [{

                  title : `\`${pTitle}\``,
                  description : `\`${pContent}\``

               }]

            });

         }

      }[pKind]();

   }


   listen() {

      // event (new input) <
      // event (new member) <
      // this.client.on('interactionCreate', async (interaction) => {  

      //    await this.message({

      //       pKind : 'interaction',
      //       pTitle : interaction.commandName,
      //       pContent : await this.commands[interaction.commandName].run({

      //          oDatabase : this.database,
      //          pTag : interaction.user.tag,
      //          pFile : interaction.options.get('file')?.value,
      //          pAction : interaction.options.get('action')?.value,
      //          pContent : interaction.options.get('content')?.value

      //       })

      //    });
      
      // });
      this.client.on('guildMemberAdd', async (member) => {

         // if (new member) <
         if (await this.database.setUser(member.user.id)) {

            await this.message({

               pKind : 'member',
               pContent : member.user.id,
               pTitle : member.user.username,
               pThumbnail : member.user.displayAvatarURL(),
               pChannel : this.client.channels.cache.get(this.channelId)

            });

         }

         // >

      });

      // >

   }


   async run() {

      this.client.login(this.token);
      this.client.rest.put(
 
         Routes.applicationGuildCommands(

            this.applicationId,
            this.guildId

         ),
         {body : Object.values(this.commands).map((i) => {return i.context();})}

      );

      this.listen();
      
   }

}


// export <
module.exports = client;

// >