FROM node:18.16.0


# referencing docker compose #
ENV discordToken ${discordToken}

ENV guildId ${guildId}
ENV channelId ${channelId}
ENV applicationId ${applicationId}

ENV maxMembers ${maxMembers}
ENV dataFilePath ${dataFilePath}


WORKDIR /app
COPY ./ /app
RUN npm install


RUN mkdir /app/data


CMD ["node", "index.js"]