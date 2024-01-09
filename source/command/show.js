// import <


// >


class show {

   constructor(pDatabase) {this.database = pDatabase;}


   context() {

      return {

         type : 1,
         name : 'show',
         description : 'description'

      }

   }


   async run({pTag}) {

      // if (user in database) <
      // else (then user not in database) <
      if (await this.database.exists({pDir : '', pName : pTag})) {

         const files = await this.database.getDir({pDir : pTag});
         const result = files.map((i) => {return i.slice(0, -5);});

         return {content : result.join('\n')};   

      } else {return {content : 'We were unable to find you.'};}

      // >

   }

}


// export <
module.exports = show;

// >