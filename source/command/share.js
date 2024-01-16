// import <
const remove = require('./remove.js');
const encrypt = require('./encrypt.js');
const decrypt = require('./decrypt.js');

// >


// if we remove, then we have to remove the existing file from the users's folder
// along with removing him from receivers
// if it IS a share, then we set the content to false and trigger to call owner's file
// that way we're secure/dependent for updates


class share {

   constructor(pDatabase) {

      this.database = pDatabase;
      this.remove = new remove(this.database);
      this.encrypt = new encrypt(this.database);
      this.decrypt = new decrypt(this.database);

   }


   context() {

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
               description : 'description'

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

      return pTag == result.owner;

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
      pAction,
      pFilePath,
      pRecipient

   }) {

      const[tag, file] = pFilePath.split('/');
      let isOwner = this.isOwner({pTag : tag, pKey : pKey, pFilePath : pFilePath});
      let isAvailable = !(this.database.exists({pDir : pRecipient, pName : file}));

      return {

         // if (not permitted) <
         // else (then shareable) <
         false : false,
         true : async () => {

            // owner changes <
            // recipient changes <
            await this.core({

               pTag : pTag,
               pKey : pKey,
               pAction : pAction,
               pFilePath : pFilePath,
               pRecipient : pRecipient

            });
            
            await {

               'add' : await this.encrypt.run,
               'remove' : await this.remove.run

            }[pAction]({

               pShare : tag,
               pContent : false,
               pTag : pRecipient,
               pFilePath : pFilePath,
               pKey : pUsers[pRecipient].key

            });

            // >
            
         }

         // >

      }[isOwner && isAvailable];

   }

}


// export <
module.exports = share;

// >