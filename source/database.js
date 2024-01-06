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

         users[(m.embeds[0].title).slice(1, -1)] = {

            'icon' : (m.embeds[0]).thumbnail.url,
            'id' : (m.embeds[0].description).slice(1, -1).split('\n')[0],
            'key' : (m.embeds[0].description).slice(1, -1).split('\n')[1]

         };

      }

      return users;

   }


   async setUser(pTag) {

      const inDirectory = await this.isFile({pTag : '', pFile : pTag});
      const inUsers = (((Object.values(this.getUsers)).indexOf(pTag)) != -1);

      // if (new member) <
      if (!inDirectory && !inUsers) {

         await dirSet({pDir : `${this.dataFilepath}/${pTag}`});
         return true;

      }

      // >

   }


   async getFiles(pTag) {

      return await dirGet({pDir : `${this.dataFilepath}/${pTag}`})

   }


   async getFile({

      pTag,
      pFile

   }) {

      return await fileGet({pFile : `${this.dataFilepath}/${pTag}/${pFile}`});

   }


   async setFile({

      pTag,
      pFile,
      pData

   }) {

      await fileSet({

         pData : pData,
         pFile : `${this.dataFilepath}/${pTag}/${pFile}`

      });

   }


   async delFile({

      pTag,
      pFile

   }) {

      await fileDel({pFile : `${this.dataFilepath}/${pTag}/${pFile}`})

   }


   async isFile({

      pTag,
      pFile

   }) {

      const dir = await dirGet({pDir : `${this.dataFilepath}/${pTag}`});
      const location = dir.indexOf(pFile);

      return location != -1;

   }


}


// export <
module.exports = database;

// >