FROM alsace_server:latest

RUN mkdir /home/node/app/client
WORKDIR /home/node/app/client

COPY angular.json .
COPY package.json .
COPY ionic.config.json .
COPY tsconfig.json .
COPY tslint.json .
COPY config.xml .

COPY e2e .
COPY src .
COPY resources .

RUN npm install -g ionic@4.12 cordova && npm rebuild node-sass
CMD npm install && npm rebuild node-sass && ionic serve -p 8100
