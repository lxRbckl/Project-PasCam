// import <
const encrypt = require('./encrypt.js');
const decrypt = require('./decrypt.js');

// >


class share {

   constructor(pDatabase) {

      this.database = pDatabase;
      this.encrypt = new encrypt(pDatabase);
      this.decrypt = new decrypt(pDatabase);

   }


   context(pMembers) {

      return {

         type : 1,
         name : 'share',
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
               name : 'action',
               required : true,
               description : 'description',
               choices : [

                  {

                     name : 'add',
                     value : 'add'

                  },
                  {

                     name : 'remove',
                     value : 'remove'

                  }

               ]

            },
            {

               type : 3,
               required : true,
               name : 'recipient',
               description : 'description',
               choices : (Array.isArray(pMembers) ? pMembers.map(m => {

                  return {

                     name : m,
                     value : m

                  };

               }) : [])

            }

         ]

      }

   }


   isOwner({

      pTag,
      pResult

   }) {return (pTag == pResult.owner);}


   async isRecipient({

      pKey,
      pFilePath,
      pRecipient

   }) {
      
      let result = await this.decrypt.core({

         pKey : pKey,
         pData : await this.database.getFile({pFile : pFilePath})

      });

      return (result.share).includes(pRecipient) ? pRecipient : undefined;

   }


   async core({

      pTag,
      pKey,
      pAction,
      pFilePath,
      pRecipient

   }) {

      let result = await this.decrypt.core({

         pKey : pKey,
         pData : await this.database.getFile({pFile : pFilePath})

      });

      await this.encrypt.run({

         pTag : pTag,
         pKey : pKey,
         pFilePath : pFilePath,
         pContent : result.content,
         pShare : {

            'add' : [...result.share, pRecipient],
            'remove' : (result.share).filter(i => i != pRecipient)

         }[pAction]

      });

   }


   async run({

      pTag,
      pKey,
      pFile,
      pUsers,
      oRemove,
      pAction,
      pFilePath,
      pRecipient

   }) {

      let result = await this.decrypt.core({

         pKey : pKey,
         pData : await this.database.getFile({pFile : pFilePath})

      });

      let isOpen = !([result.owner, ...result.share].includes(pRecipient));
      let isNew = !(await this.database.exists({pDir : pRecipient, pName : pFile}));

      // if (owner, open, new) <
      // else (then not allowed) <
      if ((result.content) && (isOpen) && (isNew)) {

         // owner changes <
         // recipient changes <
         await this.core({

            pTag : pTag,
            pKey : pKey,
            pResult : result,
            pAction : pAction,
            pFilePath : pFilePath,
            pRecipient : pRecipient

         });

         return await {

            'remove' : oRemove,
            'add' : this.encrypt

         }[pAction].run({

            pTag : pTag,
            pShare : [],
            pFile : pFile,
            pUsers : pUsers,
            pContent : false,
            pRecipient : pRecipient,
            pKey : pUsers[pRecipient].key,
            pFilePath : `${pRecipient}/${pFile}`

         });

         // >

      }
      else {return false;}

      // >

   }

}


// export <
module.exports = share;

// >