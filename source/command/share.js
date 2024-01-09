// import <
const encrypt = require('./encrypt.js');
const decrypt = require('./decrypt.js');

// >


class share {

   constructor(pDatabase) {

      this.database = pDatabase;
      this.encrypt = new encrypt();
      this.decrypt = new decrypt();

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
               name : 'action',
               required : true,
               description : 'description',
               choices : [

                  {

                     name : 'add',
                     value : 'add'

                  },
                  {

                     name : 'remove',
                     value : 'remove'

                  }

               ]

            },
            {

               type : 3,
               name : 'to',
               required : true,
               description : 'description'
               // add list of users to choose from
               

            },
            {

               type : 3,
               name : 'notify',
               required : true,
               description : 'description',
               choices : [

                  {

                     name : 'no',
                     value : 'no'

                  },
                  {

                     name : 'yes',
                     value : 'yes'

                  }

               ]

            }

         ]

      }

   }


   async isOwner({}) {



   }


   async run({}) {



   }

}


// export <
module.exports = share;

// >