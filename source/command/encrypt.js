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
      pData,
      pFile,
      pUsers

   }) {

      // setup <
      const data = JSON.stringify(pData);
      const iv = randomBytes(this.ivSize);
      const key = Buffer.from(pUsers[pTag]['key']);

      const cipher = createCipheriv(

         this.algorithm,
         key,
         iv

      );

      // >

      await this.database.setFile({

         pFile : `${pTag}/${pFile}`,
         pData : {

            'iv' : iv,
            'data' : cipher.update(

               data,
               this.inputEncoding,
               this.outputEncoding

            ) + cipher.final(this.outputEncoding)

         }

      });

   }


   async run({

      pTag,
      pFile,
      pContent

   }) {

      // if (new file) <
      // else (then existing file) <
      if (!(await this.database.exists({pDir : pTag, pName : pFile}))) {

         await this.core({

            pTag : pTag,
            pFile : pFile,
            pUsers : await this.database.getUsers(),
            pData : {

               'share' : [],
               'owner' : pTag,
               'content' : pContent

            }
            
         });

         return {content : pFile.slice(0, -5) + ' was added successfully.'};

      } else {return {content : 'There was an error.'};}

      // >

   }

}


// export <
module.exports = encrypt;

// >