// import <
const share = require('./share.js');
const decrypt = require('./decrypt.js');

// >


class remove extends share {

   constructor(pDatabase) {
      
      super(pDatabase);
      this.database = pDatabase;
      this.decrypt = new decrypt(pDatabase);

   }

   
   context() {

      return {

         type : 1,
         name : 'remove',
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


   async run({
   
      pTag,
      pKey,
      pUsers,
      pFilePath
   
   }) {

      let result = await this.decrypt.core({

         pKey : pKey,
         pData : await this.database.getFile({pFile : pFilePath})

      });

      // if (owner) <
      // else (then not allowed) <
      if (pTag == result.owner) {

         // delete (involved recipients?) <
         // if (recipient, then update owner) <
         let [tag, file] = pFilePath.split('/');
         for (const m of [tag, ...result.share]) {

            await this.database.delFile({pFile : `${m}/${file}`});

         }

         if (result.owner != tag) {
            
            await this.core({

               pRecipient : tag,
               pAction : 'remove',
               pTag : result.owner,
               pKey : pUsers[result.owner].key,
               pFilePath : `${result.owner}/${file}`

            });
         
         }

         // >
      
      }
      else {return false;}

      // >

   }

}


// export <
module.exports = remove;

// >