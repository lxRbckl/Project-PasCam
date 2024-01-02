// import <
const {

   randomBytes,
   createCipheriv

} = require('crypto');

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




// async function encrypt(input) {

//    const iv = randomBytes(ivSize);
//    const filePath = `${input.tag}/${input.file}`;

//    // cipher (info) <
//    const cipher = createCipheriv(

//        algorithm,
//        Buffer.from(input.users[input.tag]['key']),
//        iv

//    );
//    let encr = cipher.update(

//        input.info,
//        inputEncoding,
//        outputEncoding

//    ) + cipher.final(outputEncoding);

//    // >

//    await setFile({

//        file : `${dataPath}/${filePath}`,
//        data : {

//            encr : encr,
//            iv : JSON.stringify(Array.from(iv))

//        }

//    });

//    return {

//        'encrypt' : () => {

//            input.users[input.tag]['update'] = true;
//            input.users[input.tag]['files'][input.file] = [input.tag];

//            return {'body' : `Your information **${input.file}** was encrypted.`};

//        },
//        'update' : () => {return {'body' : `Your information **${input.file}** was updated.`};}

//    }[input.command]();


// }