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
      pApplicationId,

   }) {

      // setup <
      this.token = pToken;
      this.guildId = pGuildId;
      this.channelId = pChannelId;
      this.maxMembers = pMaxMembers;
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

         'pClient' : this.client,
         'pChannelId' : this.channelId,
         'pMaxMembers' : this.maxMembers
         
      });

      // >

      // commands <
      this.commands = {

         'encrypt' : new encrypt(),
         'decrypt' : new decrypt(),
         'remove' : new remove(),
         'share' : new share(),
         'show' : new show()

      };

      // >

   }


   async message({

      pKind,
      pTitle,
      pContent,

      pIcon = undefined,
      pChannel = undefined,
      pInteraction = undefined

   }) {

      const embed = {

         title : `\`${pTitle}\``,
         thumbnail : {url : pIcon},
         description : `\`${pContent}\``,
         footer : {

            text : {

               'interaction' : 'No one else can see this message.',
               'member' : 'Do not alter or manipulate this message.'

            }[pKind]

         }

      };
      
      return {

         'member' : async () => {

            await pChannel.send({

               embeds : [embed]

            });

         },
         'interaction' : async () => {

            await pInteraction.reply({

               embeds : [embed],
               ephemeral : true

            });

         }

      }[pKind]();

   }


   listen() {

      // event (new input) <
      // event (new member) <
      this.client.on('interactionCreate', async (interaction) => {

         await this.commands[interaction.commandName].run({

            pTag : interaction.user.tag,
            pUsers : await this.database.get(),
            pFile : interaction.options.get('file')?.value,
            pAction : interaction.options.get('action')?.value,
            pContent : interaction.options.get('content')?.value

         });

      });
      this.client.on('guildMemberAdd', async (member) => {

         await this.message({

            pKind : 'member',
            pContent : member.user.id,
            pTitle : member.user.username,
            pIcon : member.user.displayAvatarURL(),
            pChannel : this.client.channels.cache.get(this.channelId)

         });

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