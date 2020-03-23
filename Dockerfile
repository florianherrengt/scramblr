FROM node:13

WORKDIR /app

COPY ./server/package.json .
COPY ./server/package-lock.json .

RUN npm install --production

COPY ./server/build .

COPY ./web/build ./assets

CMD ["node", "index.js"]
