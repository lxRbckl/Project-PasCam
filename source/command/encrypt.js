// import <


// >


class encrypt {

   constructor(

      ivSize = 16,
      keySize = 32,
      outputEncoding = 'hex',
      inputEncoding = 'utf-8',
      algorithm = 'aes-256-cbc'

   ) {

      

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