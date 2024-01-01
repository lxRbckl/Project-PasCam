// < Project PasCam by Alex Arbuckle > //


// import <
const client = require('./source/client.js');

// >


// variables <
const guildId = '970204828858990593';
const channelId = '1129843141101498378';
const applicationId = '976408750070054943';
const token = 'OTc2NDA4NzUwMDcwMDU0OTQz.Gc750P.TBr6p6LFD9mfhqOWhFzhq3BzkRTaTTCoITqAA0';

// >


(async () => {

   new client(

      pToken = token,
      pGuildId = guildId,
      pChannelId = channelId,
      pApplicationId = applicationId

   ).run();

})();


// export <
module.exports = token;

// >


// < In loving memory of our beloved bunny, Tribble. > //