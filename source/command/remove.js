// import <
const encrypt = require('./encrypt.js');
const decrypt = require('./decrypt.js');

// >


class remove {

   constructor(pDatabase) {

      this.database = pDatabase;
      this.encrypt = new encrypt();
      this.decrypt = new decrypt();

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
      pFile

   }) {

      // if (file exists) <
      if (await this.database.isFile({pTag : pTag, pFile : pFile})) {

         const result = await this.decrypt.core({

            pTag : pTag,
            pUsers : this.database.getUsers(),
            pEncrypted : await this.database.getFile({



            })

         })

         // await this.database.delFile({

         //    pTag : pTag,
         //    pFile : pFile

         // });

         return `${pFile.slice(0, -5)} was removed successfully.`;

      }

      // >

   }

}


// export <
module.exports = remove;

// >