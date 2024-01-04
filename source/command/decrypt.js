// import <
const encrypt = require('./encrypt.js');

const {createDecipheriv} = require('crypto');

// >


class decrypt extends encrypt {

   constructor() {

      super();
      
   }


   context() {

      return {

         type : 1,
         name : 'decrypt',
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
      pUsers

   }) {

      console.log(pTag, pFile, pUsers); // remove
      
   }

}


// export <
module.exports = decrypt

// >







// async function decrypt(input) {

//    const filePath = `${input.tag}/${input.file}`;
//    const file = await getFile({file : `${dataPath}/${filePath}`});

//    // decipher (info) <
//    const decipher = createDecipheriv(

//        algorithm,
//        Buffer.from(input.users[input.tag]['key']),
//        Buffer.from(JSON.parse(file.iv))

//    );
//    let decr = decipher.update(

//        file.encr,
//        outputEncoding,
//        inputEncoding

//    ) + decipher.final(inputEncoding);

//    // >

//    console.log('>>>', input.users); // remove
//    console.log('>>>', input.users[input.tag]); // remove
//    console.log('>>>', input.users[input.tag]['files']); // remove
//    console.log('>>>', input.users[input.tag]['files'][input.file]); // remove
//    // console.log('decr =>', input.command, ' => ', input.users[input.tag]); // remove

//    return {

//        'getUsers()' : () => JSON.parse(decr),
//        'decrypt' : () => {

//            return {

//                'info' : decr['info'],
//                'owner' : decr['list'][0],
//                'footer' : `Owned by ${decr['list'][0]}.`,
//                'icon' : input.users[decr['list'][0]]['icon']

//            }

//        }

//    }[input.command]();

// }