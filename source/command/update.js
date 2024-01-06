// import <
const encrypt = require('./encrypt.js');
const decrypt = require('./decrypt.js');

// >


class update {

   constructor() {

      this.oEncrypt = new encrypt();
      this.oDecrypt = new decrypt();
      
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
      pContent,
      oDatabase

   }) {

      // if (existing file) <
      if (await oDatabase.isFile({pTag : pTag, pFile : pFile})) {

         const decrypted = await this.oDecrypt.core({

            pTag : pTag,
            pUsers : await oDatabase.getUsers(),
            pEncrypted : await oDatabase.getFile({

               pTag : pTag,
               pFile : pFile

            })

         });

         await this.oEncrypt.core({

            pTag : pTag,
            pUsers : await oDatabase.getUsers(),
            pContent : {

               'owner' : pTag,
               'content' : pContent,
               'share' : decrypted['share']

            }

         });

         return true;

      }

      // >
      
   }

}


// export <
module.exports = update;

// >