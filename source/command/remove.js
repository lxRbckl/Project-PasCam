// import <

// >


class remove {

   constructor(pDatabase) {this.database = pDatabase;}

   
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
      pFilePath

   }) {

      

   }

}


// export <
module.exports = remove;

// >