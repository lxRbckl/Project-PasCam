// import <
const {

   dirDel,
   dirGet,
   dirSet,
   fileDel,
   fileGet,
   fileSet

} = require('lxrbckl');

// >


class database {

   constructor({

      pClient,
      pChannelId,
      pMaxMembers,
      pDataFilepath

   }) {

      this.client = pClient;
      this.channelId = pChannelId;
      this.maxMembers = pMaxMembers;
      this.dataFilepath = pDataFilepath;

   }


   async getUsers() {

      var users = {};
      const channel = await this.client.channels.fetch(this.channelId);
      const messages = await channel.messages.fetch({limit : this.maxMembers});
      for (const m of messages.values()) {

         // try (if valid message) <
         // except (then broken message) <
         try {

            users[(m.embeds[0].description).slice(1, -1)] = {

               'icon' : (m.embeds[0].thumbnail.url),
               'key' : (m.embeds[0].title).slice(1, -1)

            };

         } catch (error) {console.log(error);}

         // >

      }

      return users;

   }


   async setUser(pId) {

      const inUsers = 1;
      const inDirectory = await this.isFile({pTag : '', pFile : pId});

      // if (new member) <
      // if (!(await this.isFile({pTag : '', pFile : pId}))) {

      //    await dirSet({pDir : `${this.dataFilepath}/${pId}`});
      //    return true;

      // }

      // >

   }


   async isFile({

      pTag,
      pFile

   }) {

      const dir = await dirGet({pDir : `${this.dataFilepath}/${pTag}`});
      const location = dir.indexOf(pFile);

      // if (DNE) <
      // else (then exists) <
      if (location == -1) {return false;}
      else {return true;}

      // >

   }


}


// export <
module.exports = database;

// >