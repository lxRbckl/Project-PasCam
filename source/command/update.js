// import <

// >


class update {

   constructor(pDatabase) {this.database = pDatabase;}


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

      //
      
   }

}


// export <
module.exports = update;

// >