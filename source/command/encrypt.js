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


   async core({

      pTag,
      pUsers,
      pContent

   }) {


      // setup <
      const iv = randomBytes(this.ivSize);
      const content = JSON.stringify(pContent);
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

            content,
            this.inputEncoding,
            this.outputEncoding

         ) + cipher.final(this.outputEncoding)

      };

   }


   async run({

      pTag,
      pFile,
      pContent

   }) {

      // if (new file) <
      if (!(await this.database.exists({pDir : pTag, pName : pFile}))) {

         await this.database.setFile({

            pTag : pTag,
            pFile : pFile,
            pData : await this.core({

               pTag : pTag,
               pUsers : await this.database.getUsers(),
               pContent : {

                  'share' : [],
                  'owner' : pTag,
                  'content' : pContent

               }

            })

         });

         return `${pFile.slice(0, -5)} was added successfully.`;

      }

      // >

   }

}


// export <
module.exports = encrypt;

// >