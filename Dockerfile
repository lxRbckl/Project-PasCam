FROM node:18.16.0


ENV maxMembers 15
ENV guildId '<insert>'
ENV channelId '<insert>'
ENV dataFilePath '/data/'
ENV discordToken undefined
ENV applicationId '<insert>'


WORKDIR /app
COPY ./ /app
RUN npm install


RUN mkdir /app/data


CMD ["node", "index.js"]
