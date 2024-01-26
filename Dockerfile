FROM node:18.16.0


ENV maxMembers 15
ENV dataFilePath 'data'
ENV discordToken undefined
ENV guildId '970204828858990593'
ENV channelId '1129843141101498378'
ENV applicationId '976408750070054943'


WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install


CMD ["node", "index.js"]
