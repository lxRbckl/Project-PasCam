FROM node:18.16.0


ENV maxMembers 15
ENV dataFilePath '/data/'
ENV discordToken undefined
ENV guildId '970204828858990593'
ENV channelId '1129843141101498378'
ENV applicationId '976408750070054943'


WORKDIR /app
COPY ./ /app
RUN npm install


RUN mkdir /app/data


CMD ["node", "index.js"]
