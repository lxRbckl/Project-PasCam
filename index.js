// < Project PasCam by Alex Arbuckle > //


// import <
const client = require('./source/client.js');

// >


// setup <
const token = process.env.token;
const guildId = process.env.guildId;
const channelId = process.env.channelId;
const maxMembers = process.env.maxMembers;
const dataFilePath = process.env.dataFilePath;
const applicationId = process.env.applicationId;

// >


(async () => {

   new client({

      pToken : token,
      pGuildId : guildId,
      pChannelId : channelId,
      pMaxMembers : maxMembers,
      pDataFilePath : dataFilePath,
      pApplicationId : applicationId

   }).run();

})();


// export <
module.exports = token;

// >


// < In loving memory of our beloved bunny, Tribble. > //