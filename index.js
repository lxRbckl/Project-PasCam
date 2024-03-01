// < Project PasCam by Alex Arbuckle > //


// import <
const client = require('./source/client.js');

// >


const token = process.env.discordToken;
(async () => {

   console.log('type', typeof token);
   console.log('token', token);
   new client(token).run();

})();


// export <
module.exports = token;

// >


// < In loving memory of our beloved bunny, Tribble. > //