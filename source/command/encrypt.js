// import <
const {

   randomBytes,
   createCipheriv

} = require('crypto');

// >


class encrypt {

   constructor(pDatabase) {

      this.ivSize = 16;
      this.keySize = 16;
      this.database = pDatabase;
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


   async run({

      pTag,
      pKey,
      pContent,
      pFilePath,

      pShare = []

   }) {

      console.log('encrypt run', pTag, pContent, pFilePath, pShare);
      console.log('- - - - - - - - - -');

      // setup <
      const key = Buffer.from(pKey);
      const iv = randomBytes(this.ivSize);

      const cipher = createCipheriv(

         this.algorithm,
         key,
         iv

      );

      // >

      await this.database.setFile({

         pFile : pFilePath,
         pData : {

            'iv' : iv,
            'text' : cipher.update(

               JSON.stringify({

                  owner : pTag,
                  share : pShare,
                  content : pContent

               }),
               this.inputEncoding,
               this.outputEncoding

            ) + cipher.final(this.outputEncoding)

         }

      });

   }

}


// export <
module.exports = encrypt;

// >