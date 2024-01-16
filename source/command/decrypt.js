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
      pUsers,
      pFilePath,

      isShared = false

   }) {

      const result = await this.core({

         pKey : pKey,
         pData : await this.database.getFile({pFile : pFilePath})

      });

      // if (original) <
      // else (then shared) <
      if (pTag == result.owner) {

         return {

            content : '> ' + (result.content).replace(/ /g, '\n> '),
            footer : {

               // true (if shared) <
               // false (then owner) <
               true : `Owned by ${result.owner}`,
               false : `Shared with ${(result.share).join(' • ')}`

               // >

            }[isShared]
         
         };
      
      }
      else {

         return await this.run({

            isShared : true,
            pTag : result.owner,
            pKey : pUsers[result.owner].key,
            pFilePath : pFilePath.replace(pTag, result.owner)

         });

      }

      // >
         
   }

}


// export <
module.exports = decrypt

// >