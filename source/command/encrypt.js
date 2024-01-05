// import <
const {

   randomBytes,
   createCipheriv

} = require('crypto');

// >


class encrypt {

   constructor() {

      this.ivSize = 16,
      this.keySize = 32,
      this.outputEncoding = 'hex',
      this.inputEncoding = 'utf-8',
      this.algorithm = 'aes-256-cbc'

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
               required : true,
               name : 'content',
               description : 'description'

            }

         ]

      }

   }


   async run({

      pId,
      pTag,
      pFile,
      pContent,
      oDatabase

   }) {

      // setup <
      const key = pUsers[pTag]['key'];
      const iv = randomBytes(this.ivSize);

      const cipher = createCipheriv(

         this.algorithm,
         key,
         iv

      );

      // >

      return {

         'iv' : iv,
         'encrypted' : Buffer.concat([

            cipher.update(

               pContent,
               this.inputEncoding,
               this.outputEncoding
               
            ),
            cipher.final()

         ])

      };

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