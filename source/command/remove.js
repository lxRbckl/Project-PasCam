// import <
const decrypt = require('./decrypt.js');

// >


class remove {

   constructor() {

      this.decrypt = new decrypt();

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


   async run() {



   }

}


// export <
module.exports = remove;

// >










// async function remove(input) {

//    const filePath = `${input.tag}/${input.file}`;
//    const [owner, ...share] = input.users[input.tag]['files'][input.file];

//    // if (is owner) <
//    if (owner.includes(input.tag)) {

//        input.users[input.tag]['update'] = true;
//        await delFile({file : `${dataPath}/${filePath}`});
//        delete input.users[input.tag]['files'][input.file];

//        return {'body' : `The file **${input.file}** was removed.`}

//    }

//    // >

// }