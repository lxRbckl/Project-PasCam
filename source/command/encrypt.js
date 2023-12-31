// import <


// >


class encrypt {

   constructor() {

      

   }


   context() {

      return {

         type : 1,
         name : 'encrypt',
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
               name : 'info',
               required : true,
               description : 'description'

            }

         ]

      }

   }

   async run() {



   }

}


// export <
module.exports = encrypt;

// >