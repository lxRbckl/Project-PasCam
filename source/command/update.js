// import <
const share = require('./share.js');

// >


class update extends share {

   constructor(pDatabase) {

      super(pDatabase);
      this.database = pDatabase;
      
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
      pFile,
      pContent

   }) {

      // if (existing file) <
      if (await this.database.isFile({pTag : pTag, pFile : pFile})) {

         // check and see if it was originally a shared file //
         // update owner's file if it was indeed shared //

         // const decrypted = await this.oDecrypt.core({

         //    pTag : pTag,
         //    pUsers : await this.database.getUsers(),
         //    pEncrypted : await this.database.getFile({

         //       pTag : pTag,
         //       pFile : pFile

         //    })

         // });

         // await this.oEncrypt.core({

         //    pTag : pTag,
         //    pUsers : await this.database.getUsers(),
         //    pContent : {

         //       'owner' : pTag,
         //       'content' : pContent,
         //       'share' : decrypted['share']

         //    }

         // });

         // return true;

      }

      // >
      
   }

}


// export <
module.exports = update;

// >