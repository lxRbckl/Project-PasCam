// import <
const share = require('./share.js');

// >


class remove extends share {

   constructor(pDatabase) {

      super(pDatabase);
      this.database = pDatabase;

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
      // else (then new file) <
      // if (await this.database.isFile({pTag : pTag, pFile : pFile})) {
      if (await this.database.exists({pDir : pTag, pName : pFile})) {

         // decrypt caller
         // decrypt owner? from caller
         // delete file for caller
         // remove caller from owner's share




         // const result = await this.decrypt.core({

         //    pTag : pTag,
         //    pUsers : this.database.getUsers(),
         //    pEncrypted : await this.database.getFile({

         //    })

         // })

         // await this.database.delFile({

         //    pTag : pTag,
         //    pFile : pFile

         // });

         // 

         return `${pFile.slice(0, -5)} was removed successfully.`;

      } else {return {content : 'There was an error.'};}

      // >

   }

}


// export <
module.exports = remove;

// >