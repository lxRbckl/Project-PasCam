// import <
const encrypt = require('./encrypt.js');
const decrypt = require('./decrypt.js');

// >


class share {

   constructor(pDatabase) {

      this.database = pDatabase;
      this.encrypt = new encrypt();
      this.decrypt = new decrypt();
      this.success = 'was successful.';
      this.fail = 'We were unable to share your file.';

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
               name : 'receiver',
               description : 'description'

            }

         ]

      }

   }


   async core({

      pTag,
      pFile,
      pUsers,
      pAction,
      pReceiver

   }) {

      await this.encrypt.core({

         pTag : pTag,
         pFile : pFile,
         pUsers : pUsers,
         pData : {

            'owner' : result[owner],
            'content' : result[content],
            'share' : {

               'add' : [...result['share'], pReceiver],
               'remove' : result['share'].filter(i => i != pReceiver)

            }[pAction]

         }

      });

   }


   // if we remove, then we have to remove the existing file from the users's folder
   // along with removing him from receivers


   async run({

      pTag,
      pFile,
      pAction,
      pReceiver

   }) {

      // if (file exists) <
      if (await this.database.exists({pDir : pTag, pName : pFile})) {

         const users = await this.database.getUsers();
         const isOpen = !(this.database.exists({
            
            pName : pFile,
            pDir : pReceiver
         
         }));
         const result = this.decrypt.core({

            pTag : pTag,
            pUsers : users,
            pData : await this.database.getFile({pFile : `${pTag}/${pFile}`})

         })

         // if (original owner) <
         if (pTag == result['owner']) {

            await this.core({

               pTag : pTag,
               pFile : pFile,
               pUsers : users,
               pAction : pAction,
               pReceiver : pReceiver

            });
            await this.encrypt.run({

               pFile : pFile,
               pTag : pReceiver,
               pContent : result['content']

            });

         }

         // >

      }

      // >

   }

}


// export <
module.exports = share;

// >