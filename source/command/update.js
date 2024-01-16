// import <
const encrypt = require('./encrypt.js');
const decrypt = require('./decrypt.js');

// >


class update {

   constructor(pDatabase) {
      
      this.database = pDatabase;
      this.encrypt = new encrypt(this.database);
      this.decrypt = new decrypt(this.database);
   
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

      console.log('share', result.share); // remove
      console.log('update is share', (pTag == result.share));
      await this.encrypt.run({

         pTag : pTag,
         pKey : pKey,
         pContent : pContent,
         pFilePath : pFilePath,
         pShare : {

            // false (then is owner) <
            // true (then was recipient) <
            false : [],
            true : result.share

            // >

         }[pTag == result.owner]

      });
      
   }

}


// export <
module.exports = update;

// >