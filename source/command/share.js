// import <
const encrypt = require('./encrypt.js');
const decrypt = require('./decrypt.js');

// >


class share {

   constructor(pDatabase) {

      this.database = pDatabase;
      this.encrypt = new encrypt();
      this.decrypt = new decrypt();

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
               name : 'to',
               required : true,
               description : 'description'
               

            },
            {

               type : 3,
               name : 'notify',
               required : true,
               description : 'description',
               choices : [

                  {

                     name : 'no',
                     value : 'no'

                  },
                  {

                     name : 'yes',
                     value : 'yes'

                  }

               ]

            }

         ]

      }

   }


   async isOwner({

      pTag,
      pFile

   }) {

      const result = await this.decrypt.core({

         pTag : pTag,
         pUsers : await this.database.getUsers(),
         pData : await this.database.getFile({pFile : `${pTag}/${pFile}`})

      });

      return pTag == result['owner'];

   }


   async core({

      pTag,
      pFile,
      pOwner,
      pUsers,
      pAction,
      pReceiver

   }) {

      const result = this.decrypt.core({

         pTag : pOwner,
         pUsers : pUsers,
         pData : await this.database.getFile({pFile : `${pOwner}/${pFile}`})

      });

      const share = {

         'add' : () => {return [...result['share'], pReceiver]},
         'remove' : () => {return result['share'].filter(i => i != pReceiver)}

      }[pAction]();

      await this.encrypt.core({

         pTag : pTag,
         pFile : pFile,
         pUsers : pUsers,
         pData : {

            'share' : share,
            'owner' : result[owner],
            'content' : result[content]

         }

      });

   }


   async run({}) {



   }

}


// export <
module.exports = share;

// >