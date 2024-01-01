// import <
const token = require('../index.js');

// >


// if (token exists) <
// else (then success) <
if (token) {

   console.log('Token exists.');
   process.exit(1);

} else {process.exit(0);}

// >