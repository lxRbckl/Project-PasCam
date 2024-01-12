// import <
const encrypt = require('./encrypt.js');

const {createDecipheriv} = require('crypto');

// >


class decrypt extends encrypt {

   constructor(pDatabase) {
      
      super(pDatabase);
      this.database = pDatabase;
   
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

      pKey,
      pData

   }) {

      // setup <
      const text = pData.text;
      const key = Buffer.from(pKey);
      const iv = Buffer.from(pData.iv);

      const decipher = createDecipheriv(

         this.algorithm,
         key,
         iv

      );

      // >

      return JSON.parse(decipher.update(

         text,
         this.outputEncoding,
         this.inputEncoding

      ) + decipher.final(super.inputEncoding));

   }


   async run({

      pTag,
      pKey,
      pFile

   }) {

      const result = await this.core({

         pKey : pKey,
         pData : await this.database.getFile({pFile : pFile})

      });

      return {

         content : result.content,
         footer : {

            false : `Owned by ${result.owner}`,
            true : `Shared with ${(result.share).join(' • ')}`

         }[pTag == result.owner]

      };
         
   }

}


// export <
module.exports = decrypt

// >