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

      let files = await this.database.getDir({pDir : pTag});
      let result = files.map(i => i.slice(0, -5)).join('\n');

      return {content : result};

   }

}


// export <
module.exports = show;

// >