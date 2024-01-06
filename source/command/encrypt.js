// import <
const {

   randomBytes,
   createCipheriv

} = require('crypto');

// >


class encrypt {

   constructor() {

      this.ivSize = 16;
      this.keySize = 16;
      this.outputEncoding = 'hex';
      this.inputEncoding = 'utf-8';
      this.algorithm = 'aes-256-cbc';

   }


   context() {

      return {

         type : 1,
         name : 'encrypt',
         description : 'description',
         options : [

            {

               type : 3,
               name : 'file',
               required : true,
               description : 'description'

            },
            {

               type : 3,
               required : true,
               name : 'content',
               description : 'description'

            }

         ]

      }

   }


   async core({

      pTag,
      pUsers,
      pContent

   }) {


      // setup <
      const iv = randomBytes(this.ivSize);
      const key = Buffer.from(pUsers[pTag]['key']);

      const cipher = createCipheriv(

         this.algorithm,
         key,
         iv

      );

      // >

      return {

         'iv' : iv,
         'content' : cipher.update(

            pContent,
            this.inputEncoding,
            this.outputEncoding

         ) + cipher.final(this.outputEncoding)

      };

   }


   async run({

      pTag,
      pFile,
      pContent,
      oDatabase

   }) {

      // if (new file) <
      if (!(await oDatabase.isFile({pTag : pTag, pFile : pFile}))) {

         await oDatabase.setFile({

            pTag : pTag,
            pFile : pFile,
            pData : await this.core({

               pTag : pTag,
               pContent : pContent,
               pUsers : await oDatabase.getUsers()

            })

         });

         return true;

      }

      // >

   }

}


// export <
module.exports = encrypt;

// >