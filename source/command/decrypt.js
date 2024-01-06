// import <
const encrypt = require('./encrypt.js');

const {createDecipheriv} = require('crypto');

// >


class decrypt extends encrypt {

   constructor() {

      super();
      
   }


   context() {

      return {

         type : 1,
         name : 'decrypt',
         description : 'description',
         options : [

            {

               type : 3,
               name : 'file',
               required : true,
               description : 'description'

            }

         ]  

      }

   }


   async run({

      pTag,
      pFile,
      pUsers

   }) {

      console.log(pTag, pFile, pUsers); // remove
      
   }

}


// export <
module.exports = decrypt

// >



// const decipher = createDecipheriv(

//    this.algorithm,
//    Buffer.from(users[pTag]['key']),
//    encr['iv']

// );
// let decr = decipher.update(

//    encr['encrypted'],
//    this.outputEncoding,
//    this.inputEncoding

// ) + decipher.final(this.inputEncoding);