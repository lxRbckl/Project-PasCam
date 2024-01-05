// import <
const encrypt = require('./encrypt.js');

// >


class update extends encrypt {

   constructor() {

      super();

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


   run() {


      
   }

}


// export <
module.exports = update;

// >