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


   isOwner({

      pTag,
      pResult

   }) {return (pTag == pResult.owner);}


   async isRecipient({

      pKey,
      pFilePath,
      pRecipient

   }) {

      console.log('isRecipient', pKey, pFilePath, pRecipient);
      
      let result = await this.decrypt.core({

         pKey : pKey,
         pData : await this.database.getFile({pFile : pFilePath})

      });

      console.log('recipient result', result);
      console.log('- - - - - - - - - - - -');

      return (result.share).includes(pRecipient) ? pRecipient : undefined;

   }


   async core({

      pTag,
      pKey,
      pAction,
      pFilePath,
      pRecipient

   }) {

      console.log('share core', pTag, pAction, pFilePath, pRecipient);
      console.log('- - - - - - - - - -');

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

      console.log('share run', pTag, pFile, pAction, pFilePath, pRecipient);

      let result = await this.decrypt.core({

         pKey : pKey,
         pData : await this.database.getFile({pFile : pFilePath})

      });

      let isRemove = (pAction == 'remove');
      let owner = this.isOwner({pTag : pTag, pResult : result});
      let isAvailable = !(await this.database.exists({
         
         pName : pFile, 
         pDir : pRecipient
      
      }));
      let recipient = await this.isRecipient({

         pRecipient : pRecipient,
         pKey : pUsers[result.owner].key,
         pFilePath : `${result.owner}/${pFile}`
      
      });

      console.log('share logic', isRemove, owner, isAvailable, recipient);
      console.log('- - - - - - - - - - - -');

      return {

         // if (not permitted) <
         // else (then shareable) <
         false : () => {return false;},
         true : async () => {

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
               pRecipient : recipient,
               pKey : pUsers[pRecipient].key,
               pFilePath : `${pRecipient}/${pFile}`

            });

            // >
            
         }

         // >

      }[(owner && isAvailable && !recipient) || (isRemove)]();

   }

}


// export <
module.exports = share;

// >