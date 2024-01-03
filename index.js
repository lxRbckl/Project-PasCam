// < Project PasCam by Alex Arbuckle > //


// import <
const client = require('./source/client.js');

// >


// setup <
const guildId = '970204828858990593';
const channelId = '1129843141101498378';
const applicationId = '976408750070054943';
const token = undefined;

// >


(async () => {

   new client({

      'pToken' : token,
      'pGuildId' : guildId,
      'pChannelId' : channelId,
      'pApplicationId' : applicationId

   }).run();

})();


// export <
module.exports = token;

// >


// < In loving memory of our beloved bunny, Tribble. > //


// start off by updating the code, removing what's not needed?
// the next thing we should do is the add member event


// update
// keys stored in the channel will be a user's user id.
// when the database is built, our keys should be converted to buffer (Buffer.from)


// sharing functionality
// for owner : [user : [file : [owner : '', users : [], content : []]]]
// for receiver : [user : [->file : [owner : '', users : false]]]
// then recipient refers to owner's file, and decrypts
// because users is false, then recipient cannot share further