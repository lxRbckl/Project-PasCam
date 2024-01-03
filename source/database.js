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
      const messages = await channel.messages.fetch({limit : this.maxMembers})
      for (const m of messages.values()) {

         // try (if ) <
         // except (then ) <
         try {

            const tag = m.embeds[0].title;
            const key = JSON.parse((m.embeds[0].description).slice(3, -3));

            users[tag] = {



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