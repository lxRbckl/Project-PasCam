// import <
const share = require('./share.js');
const encrypt = require('./encrypt.js');
const decrypt = require('./decrypt.js');

// >


class update extends share {

   constructor(pDatabase) {
      
      super(pDatabase);
      this.database = pDatabase;
      this.encrypt = new encrypt(pDatabase);
      this.decrypt = new decrypt(pDatabase);
   
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
      pUsers,
      pContent,
      pFilePath

   }) {

      console.log('update run', pTag, pContent, pFilePath);
      console.log('- - - - - - - - - -');

      let result = await this.decrypt.core({

         pKey : pKey,
         pData : await this.database.getFile({pFile : pFilePath})

      });

      // if (recipient, then update owner) <
      if (pTag != result.owner) {

         await super.core({

            pResult : result,
            pRecipient : pTag,
            pAction : 'remove',
            pTag : result.owner,
            pKey : pUsers[result.owner].key,
            pFilePath : pFilePath.replace(pTag, result.owner)

         });

      }

      // >

      await this.encrypt.run({

         pTag : pTag,
         pKey : pKey,
         pContent : pContent,
         pFilePath : pFilePath,
         pShare : {

            // true (if owner) <
            // false (then is recipient) <
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