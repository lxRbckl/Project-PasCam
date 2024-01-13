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


   async run({pFilePath}) {

      await this.database.delFile({pFile : pFilePath});

   }

}


// export <
module.exports = remove;

// >