// import <


// >


class share {

   constructor() {



   }


   context() {

      return {

         type : 1,
         name : 'share',
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
               name : 'to',
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
module.exports = share;

// >