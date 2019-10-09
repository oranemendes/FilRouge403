#FROM keymetrics/pm2:latest-alpine
FROM node

RUN mkdir /home/node/app; exit 0
WORKDIR /home/node/app

COPY index.ts .
COPY tslint.json .

COPY tsconfig.json .
COPY .env .
COPY pm2.json .
COPY package.json .
COPY server .

#ENV NPM_CONFIG_LOGLEVEL warn

#CMD npm install && npm run build && pm2-runtime pm2.json
CMD npm install && npm run start