// import <
const {

   Routes,
   Client,
   IntentsBitField

} = require('discord.js');

const show = require('./command/show.js');
const share = require('./command/share.js');
const remove = require('./command/remove.js');
const decrypt = require('./command/decrypt.js');
const encrypt = require('./command/encrypt.js');

// >


class client {

   constructor(

      pToken,
      pGuildId,
      pChannelId,
      pApplicationId,

      maxMembers = 15

   ) {

      // variables <
      this.token = pToken;
      this.guildId = pGuildId;
      this.channelId = pChannelId;
      this.maxMembers = maxMembers;
      this.applicationId = pApplicationId;

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

      // objects <
      this.client = new Client({

         rest : {version : '10'},
         intents : [

            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMembers,
            IntentsBitField.Flags.GuildMessages,
            IntentsBitField.Flags.MessageContent

         ]

      });

      // >

   }


   database() {



   }


   message(

      pKind,
      pTitle,
      pContent

   ) {

      const embed = {

         title : pTitle,
         description : pContent,
         footer : {

            'text' : {

               'interaction' : 'No one else can see this message.',
               'member' : 'Do not alter or manipulate this message.'

            }[pKind]

         }

      };
      
      return {

         'member' : async () => {

            await this.client.send({

               embeds : [embed]

            });

         },
         'interaction' : async () => {

            await this.client.reply({

               embeds : [embed],
               ephemeral : true

            });

         }

      }[kind];

   }


   listen() {

      // event (new input) <
      // event (new member) <
      this.client.on('interactionCreate', async (interaction) => {



      });
      this.client.on('guildMemberAdd', async (member) => {



      });

      // >

   }


   run() {

      this.client.login(this.token);
      this.client.rest.put(

         Routes.applicationGuildCommands(

            this.applicationId,
            this.guildId

         ),
         {body : Object.values(this.commands).map((i) => {i.context();})}

      );

      this.listen();

   }

}


// export <
module.exports = client;

// >