// import <
const share = require('./share.js');
const encrypt = require('./encrypt.js');
const decrypt = require('./decrypt.js');

// >


class remove {

   constructor(pDatabase) {
      
      this.database = pDatabase;
      this.encrypt = new encrypt(this.database);
      this.decrypt = new decrypt(this.database);
   
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
   
      pKey,
      pFilePath
   
   }) {

      let result = await this.decrypt.core({

         pKey : pKey,
         pData : this.database.getFile({pFile : pFilePath})

      });

      let [tag, file] = pFilePath.split('/');
      for (const m of [tag, ...result]) {

         let fp = `${m}/${file}`;
         await this.database.delFile({pFile : fp});

      }

   }

}


// export <
module.exports = remove;

// >