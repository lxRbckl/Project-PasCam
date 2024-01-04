// import <


// >


class show {

   constructor() {



   }


   context() {

      return {

         type : 1,
         name : 'show',
         description : 'description'

      }

   }


   async run({}) {



   }

}


// export <
module.exports = show;

// >













// async function show(input) {

//    var show = '';
//    const files = input.users[input.tag]['files'];
//    for (const i of Object.keys(files).sort()) {

//        var [owner, ...share] = files[i];
//        share = (share.length == 0) ? 'N/A' : share;

//        // add file <
//        // add owner <
//        // add share <
//        show += '`File: ' + i + '`\t';
//        show += '`Owner: ' + owner + '`\t';
//        show += '`Share: ' + share + '`\n';

//        // >

//    }

//    // >

//    return {'body' : show};

// }