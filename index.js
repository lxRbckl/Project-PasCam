// < Project PasCam 8 by Alex Arbuckle > //


// import <
// const {context as encryptContext} = require('./source/encrypt.js');
import {context as encryptContext} from './source/encrypt.js';
const {
   
   Client,
   Routes,
   IntentsBitField

} = require('discord.js');

// >


// declare <
const guildId = '970204828858990593'; // server where bot interacts
const channelId = '1129843141101498378'; // channel where we send messages
const applicationId = '976408750070054943'; // bot uid for server interactions
const token = '';
const client = new Client({

   rest : {version : '10'},
   intents : [

      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.MessageContent

   ]

});

// >


(async () => {

   client.login(token);
   client.rest.put(

      Routes.applicationGuildCommand(

         applicationId,
         guildId

      ),
      {body : [

         encryptContext

      ]}

   )

})();


// export <
module.exports = {client}

// >


// < In loving memory of The Bunny. > //