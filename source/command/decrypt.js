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
      pFilePath

   }) {

      const result = await this.core({

         pKey : pKey,
         pData : await this.database.getFile({pFile : pFilePath})

      });

      console.log('decrypt result', result); // remove

      // if (shared file) <
      // else (then original) <
      if (result.content) {

         console.log('decrypt here 1'); // remove

         return {

            content : '> ' + (result.content).replace(/ /g, '\n> '),
            footer : {

               // REVISE REVISE REVISE
               // true (if ) <
               // false (then ) <
               true : `Owned by ${result.share[0]}`,
               false : `Shared with ${(result.share).join(' • ')}`

               // >

            }[result.content == false]
         
         };
      
      }
      else {

         console.log('decrypt here 2'); // remove

         return await this.run({

            pUsers : pUsers,
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