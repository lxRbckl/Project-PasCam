FROM node:18


# FUTURE references to kubernetes #
ENV maxMembers 15
ENV dataFilePath '/data/'
ENV guildId '970204828858990593'
ENV channelId '1129843141101498378'
ENV applicationId '976408750070054943'
ENV token undefined

ENV repository 'https://github.com/lxRbckl/Project-PasCam.git'


WORKDIR /usr/src/app
COPY . .


RUN apt-get install -y git
# RUN npm install


RUN git clone ${repository}

RUN cd Project-PasCam
RUN npm install
RUN mkdir data


CMD ["node", "index.js"]