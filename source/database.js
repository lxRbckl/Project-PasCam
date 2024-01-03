// import <


// >


class database {

   constructor({

      pClient,
      pChannelId,
      pMaxMembers

   }) {

      this.client = pClient;
      this.channelId = pChannelId;
      this.maxMembers = pMaxMembers;

   }


   async get() {

      var users = {};
      const channel = await this.client.channels.fetch(this.channelId);
      const messages = await channel.messages.fetch({limit : this.maxMembers});
      for (const m of messages.values()) {

         // try (if ) <
         // except (then ) <
         try {

            users[(m.embeds[0].title).slice(1, -1)] = {

               'icon' : (m.embeds[0].thumbnail.url),
               'key' : (m.embeds[0].description).slice(1, -1)

            };

         } catch (error) {console.log(error);}

         // >

      }

      return users;

   }

}


// export <
module.exports = database;

// >