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


   async core({

      pTag,
      pUsers,
      pEncrypted

   }) {

      // setup <
      const content = pEncrypted['content'];
      const iv = Buffer.from(pEncrypted['iv']);
      const key = Buffer.from(pUsers[pTag]['key']);

      const decipher = createDecipheriv(

         this.algorithm,
         key,
         iv

      );

      // >

      return decipher.update(

         content,
         this.outputEncoding,
         this.inputEncoding

      ) + decipher.final(super.inputEncoding);

   }


   async run({

      pTag,
      pFile,
      oDatabase

   }) {

      // if (existing file) <
      if (await oDatabase.isFile({pTag : pTag, pFile : pFile})) {

         return await this.core({

            pTag : pTag,
            pUsers : await oDatabase.getUsers(),
            pEncrypted : await oDatabase.getFile({

               pTag : pTag,
               pFile : pFile

            })

         });
      
      }

      // >
   
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