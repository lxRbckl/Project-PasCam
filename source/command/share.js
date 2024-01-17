// import <
const encrypt = require('./encrypt.js');
const decrypt = require('./decrypt.js');

// >


class share {

   // when i share a file to user, that user can delete it
   //

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
               choices : pMembers.map(m => {

                  return {

                     name : m,
                     value : m

                  };

               })

            }

         ]

      }

   }


   async isOwner({

      pTag,
      pKey,
      pFilePath

   }) {

      let result = await this.decrypt.core({

         pKey : pKey,
         pData : await this.database.getFile({pFile : pFilePath})

      });

      return (pTag == result.owner);

   }


   async isShared({

      pKey,
      pFilePath,
      pRecipient

   }) {

      let result = await this.decrypt.core({

         pKey : pKey,
         pData : await this.database.getFile({pFile : pFilePath})

      });

      return ((result.share).includes(pRecipient));

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

      pKey,
      pUsers,
      oRemove,
      pAction,
      pFilePath,
      pRecipient

   }) {

      let isRemove = (pAction == 'remove');
      const [tag, file] = pFilePath.split('/');
      let isTaken = await this.database.exists({
         
         pName : file,
         pDir : pRecipient
      
      });
      let isOwner = await this.isOwner({
         
         pTag : tag, 
         pKey : pKey, 
         pFilePath : pFilePath
      
      });
      let isRecipient = await this.isShared({

         pKey : pKey,
         pFilePath : pFilePath,
         pRecipient : pRecipient

      });

      return {

         // if (not permitted) <
         // else (then shareable) <
         false : () => {return false;},
         true : async () => {

            // owner changes <
            // recipient changes <
            await this.core({

               pTag : tag,
               pKey : pKey,
               pAction : pAction,
               pFilePath : pFilePath,
               pRecipient : pRecipient

            });

            return await {

               'remove' : oRemove,
               'add' : this.encrypt

            }[pAction].run({

               pTag : tag,
               pShare : [],
               pUsers : pUsers,
               pContent : false,
               pKey : pUsers[pRecipient].key,
               pFilePath : `${pRecipient}/${file}`

            });

            // >
            
         }

         // >

      }[(isOwner && !isTaken && !isRecipient) || (isRemove)]();

   }

}


// export <
module.exports = share;

// >