FROM node:13

WORKDIR /app

COPY ./server/package.json .
COPY ./server/yarn.lock .

RUN npm install --production

COPY ./server .

COPY ./web/build ./assets
COPY ./landing ./assets/landing

CMD ["node", "build/index.js"]
