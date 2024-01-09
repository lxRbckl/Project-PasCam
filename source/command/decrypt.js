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
      pData,
      pUsers

   }) {

      // setup <
      const data = pData['data'];
      const iv = Buffer.from(pData['iv']);
      const key = Buffer.from(pUsers[pTag]['key']);

      const decipher = createDecipheriv(

         this.algorithm,
         key,
         iv

      );

      // >

      return JSON.parse(decipher.update(

         data,
         this.outputEncoding,
         this.inputEncoding

      ) + decipher.final(super.inputEncoding));

   }


   async run({

      pTag,
      pFile

   }) {

      // if (existing file) <
      // else (then new file) <
      if (await this.database.exists({pDir : pTag, pName : pFile})) {

         const {

            share,
            owner,
            content

         } = await this.core({

            pTag : pTag,
            pUsers : await this.database.getUsers(),
            pData : await this.database.getFile({pFile : `${pTag}/${pFile}`})

         });

         return {

            content : content,
            footer : {

               false : 'Shared by ' + owner + '.',
               true : 'Shared with ' + share?.join(' • ')

            }[pTag == owner]

         };
      
      } else {return {content : 'There was an error.'};}

      // >
   
   }

}


// export <
module.exports = decrypt

// >