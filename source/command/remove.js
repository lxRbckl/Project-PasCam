// import <
const encrypt = require('./encrypt.js');
const decrypt = require('./decrypt.js');

// >


class remove {

   // we're going to need to decrypt file to see if it's shared
   // if it's shared, then we'll need encrypt to update owner's file
   constructor() {

      this.encrypt = new encrypt();
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


   async run({

      pTag,
      pFile,
      oDatabase

   }) {

      // if (file exists) <
      if (await oDatabase.isFile({pTag : pTag, pFile : pFile})) {

         await oDatabase.delFile({

            pTag : pTag,
            pFile : pFile

         });

         return `${pFile.slice(0, -5)} was removed successfully.`;

      }

      // >

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