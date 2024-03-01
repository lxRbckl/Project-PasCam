// < Project PasCam by Alex Arbuckle > //


// import <
const client = require('./source/client.js');

// >


const token = process.env.discordToken;
(async () => {new client(token).run();})();


// export <
module.exports = token;

// >


// < In loving memory of our beloved bunny, Tribble. > //