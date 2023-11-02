// import <


// >


// declare <
const context = {

   type : 1,
   name : 'encrypt',
   description : 'store info for later use',
   options : [

      {

         type : 3,
         name : 'file',
         required : true,
         description : 'a non-existing file'

      },
      {

         type : 3,
         name : 'info',
         required : true,
         description : 'info to store'

      }

   ]

}

// >


async function encrypt({}) {



}

// export <
module.exports = {

   context,
   
   encrypt

}

// >