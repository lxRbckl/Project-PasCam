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

      //

   }

}


// export <
module.exports = remove;

// >