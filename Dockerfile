FROM node:13

WORKDIR /app

RUN npm i -g forever

COPY ./server/package.json .
COPY ./server/package-lock.json .

RUN npm install

COPY ./server .

RUN npm run build

COPY ./web/build ./assets

CMD ["forever", "build/index.js"]
