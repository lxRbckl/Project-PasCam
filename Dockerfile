FROM node:18.16.0


ENV maxMembers 15
ENV discordToken undefined
ENV dataFilePath '/app/data'
ENV guildId '970204828858990593'
ENV channelId '1129843141101498378'
ENV applicationId '976408750070054943'


WORKDIR /app
COPY ./ /app


RUN mkdir /app/data
VOLUME ["${dataFilePath}"]


RUN npm install


CMD ["node", "index.js"]
