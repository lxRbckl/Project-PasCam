// import <
const {local} = require('lxrbckl')

// >


class database extends local {

   constructor({

      pClient,
      pChannelId,
      pMaxMembers,
      pDataFilePath

   }) {

      super();
      this.show = true;
      this.client = pClient;
      this.channelId = pChannelId;
      this.maxMembers = pMaxMembers;
      this.referencePath = pDataFilePath;

   }


   async checkMember(pTag) {

      const inDirectory = await this.exists({pDir : '', pName : pTag});
      const inUsers = (((Object.values(this.getMembers())).indexOf(pTag)) != -1);

      return (!inDirectory && !inUsers);

   }


   async getMembers() {

      var users = {};
      const channel = await this.client.channels.fetch(this.channelId);
      const messages = await channel.messages.fetch({limit : this.maxMembers});
      for (const m of messages.values()) {

         users[(m.embeds[0].title).slice(1, -1)] = {

            icon : (m.embeds[0]).thumbnail.url,
            id : (m.embeds[0].description).slice(1, -1).split('\n')[0],
            key : (m.embeds[0].description).slice(1, -1).split('\n')[1]

         };

      }

      return users;

   }

}


// export <
module.exports = database;

// >