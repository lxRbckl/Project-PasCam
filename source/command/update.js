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

         

      }

      // >
      
   }

}


// export <
module.exports = update;

// >