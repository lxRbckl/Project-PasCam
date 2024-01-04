// import <
const encrypt = require('./encrypt.js');
const decrypt = require('./decrypt.js');

// >


class share {

   // when we are available to share
   // add the file to receiver, and fix content to signify that it's a shared file
   // then from the owner's file, add user's name to recipients list
   constructor() {

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

            }

         ]

      }

   }


   async run({}) {



   }

}


// export <
module.exports = share;

// >












// async function share(input) {

//    // build variable <
//    // discover condition <
//    const [owner, ...shares] = input.users[input.tag]['files'][input.file];

//    const isOwner = owner.includes(input.tag);
//    const isReceivable = !(Object.keys(input.users[input.user]['files'])).includes(input.file);

//    console.log('isOwner', isOwner); // remove
//    console.log('isReceivable', isReceivable); // remove

//    // >

//    try {

//        const output = {

//            // if (add share) <
//            // else (then remove share) <
//            'add' : {false : () => {



//            }}[share.includes(input.user)],
//            'remove' : {true : () => {



//            }}[share.includes(input.user)]

//            // >

//        }[input.action];

//        input.users[input.user]['update'] = isOwner;
//        input.users[input.tag]['update'] = isOwner;

//    } catch (error) {console.log(error);}

   // input.users[input.tag]['update'] = isOwner;
   // input.users[input.user]['update'] = isOwner;
   // input.users[input.tag]['files'][input.file] = [



   // ];
   // input.users[input.user]['files'][input.file] = [



   // ]

   // >

   // try {

   //     if (isOwner) {

   //         const output = {

   //             // if (add) <
   //             // else (then remove) <
   //             [('add', false)] : () => {

   //                 console.log('add');

   //                 share.push(input.user)
   //                 input.users[input.user]['files'][input.file] = [input.tag, 'Disabled'];

   //             },
   //             [('remove', true)] : () => {

   //                 console.log('remove');

   //                 share.splice(share.indexOf(input.user), 1);
   //                 delete input.users[input.user]['files'][input.file];

   //             }

   //             // >

   //         }[(input.action, share.includes(input.user))]();

   //         input.users[input.tag]['files'][input.file] = [owner, share]
   //         input.users[input.user]['update'] = true;
   //         input.users[input.tag]['update'] = true;

   //     }

   // } catch (error) {}

// }