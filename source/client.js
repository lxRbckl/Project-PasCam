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

      token,

      guildId = '970204828858990593',
      channelId = '1129843141101498378',
      applicationId = '976408750070054943'

   ) {

      // variables <
      this.token = token;
      this.guildId = guildId;
      this.channelId = channelId;
      this.applicationId = applicationId;

      // >

      // commands <
      this.commands = {

         'show' : new show(),
         'share' : new share(),
         'remove' : new remove(),
         'encrypt' : new encrypt(),
         'decrypt' : new decrypt(),

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

      })

      // >

   }


   listen() {



   }


   run() {


      
   }

}


// export <


// >