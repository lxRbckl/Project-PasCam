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


   async core({pFilePath}) {

      console.log('remove core', pFilePath);
      console.log('- - - - - - - - - -');

      await this.database.delFile({pFile : pFilePath});

   }


   async run({
   
      pTag,
      pKey,
      pFile,
      pUsers,
      pFilePath,
      pRecipient
      
   }) {

      console.log('remove run', pTag, pFile, pFilePath, pRecipient);
      
      let result = await this.decrypt.core({

         pKey : pKey,
         pData : await this.database.getFile({pFile : pFilePath})

      });

      let owner = super.isOwner({pTag : pTag, pResult : result});
      let recipient = await super.isRecipient({

         pRecipient : pTag,
         pKey : pUsers[result.owner].key,
         pFilePath : `${result.owner}/${pFile}`

      });


      console.log('remove logic', owner, recipient);
      console.log('- - - - - - - - - -');

      // if (not allowed) <
      // else if (only owner) <
      // else if (owner and recipient) <
      if (!owner && !recipient) {console.log('remove here 1'); return false;}
      else if (owner && !pRecipient) {

         console.log('remove here 2'); // remove
         [pTag, ...result.share].map(async i => await this.core({

            pFilePath : `${i}/${pFile}`

         }));

      }
      else if ((owner && pRecipient) || (recipient)) {

         console.log('remove here 3');
         // remove recipient file <
         // remove recipient from owner <
         await this.core({pFilePath : `${(pRecipient || recipient)}/${pFile}`});
         await super.core({

            pAction : 'remove',
            pTag : result.owner,
            pKey : pUsers[result.owner].key,
            pRecipient : pRecipient || recipient,
            pFilePath : `${result.owner}/${pFile}`

         });

         // >

      }

      // >

   }

}


// export <
module.exports = remove;

// >