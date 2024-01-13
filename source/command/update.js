// import <
const encrypt = require('./encrypt.js');
const decrypt = require('./decrypt.js');

// >


class update {

   constructor(pDatabase) {
      
      this.database = pDatabase;
      this.encrypt = new encrypt();
      this.decrypt = new decrypt();
   
   }


   context() {

      return {

         type : 1,
         name : 'update',
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
      pFilePath

   }) {

      let result = await this.decrypt.core({

         pKey : pKey,
         pData : await this.database.getFile({pFile : pFilePath})

      });

      await this.encrypt.run({

         pTag : pTag,
         pKey : pKey,
         pContent : pContent,
         pFilePath : pFilePath,
         pShare : {

            // if (was recipient) <
            // else (then is owner) <
            false : pTag,
            true : result.share

            // >

         }[pTag == result.share]

      });
      
   }

}


// export <
module.exports = update;

// >