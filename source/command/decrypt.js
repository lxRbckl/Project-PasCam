// import <
const encrypt = require('./encrypt.js');

const {createDecipheriv} = require('crypto');

// >


class decrypt extends encrypt {

   constructor(pDatabase) {
      
      super(pDatabase);
      this.database = pDatabase;
   
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


   async core({

      pTag,
      pUsers,
      pEncrypted

   }) {

      // setup <
      const content = pEncrypted['content'];
      const iv = Buffer.from(pEncrypted['iv']);
      const key = Buffer.from(pUsers[pTag]['key']);

      const decipher = createDecipheriv(

         this.algorithm,
         key,
         iv

      );

      // >

      return JSON.parse(decipher.update(

         content,
         this.outputEncoding,
         this.inputEncoding

      ) + decipher.final(super.inputEncoding));

   }


   async run({

      pTag,
      pFile

   }) {

      // if (existing file) <
      if (await this.database.exists({pDir : pTag, pName : pFile})) {

         const result = await this.core({

            pTag : pTag,
            pUsers : await this.database.getUsers(),
            pEncrypted : await this.database.getFile({pFile : `${pTag}/${pFile}`})            

         });

         return {

            owner : result['owner'],
            content : result['content'],
            footer : {

               false : `Shared by ${result['owner']}`,
               true : `Shared with ${result['share'].join(' • ')}`

            }[pTag == result['owner']]

         };
      
      }

      // >
   
   }

}


// export <
module.exports = decrypt

// >