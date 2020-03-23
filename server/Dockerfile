FROM node:13

WORKDIR /app

RUN npm i -g forever

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

RUN npm run build
RUN npm run download:web

CMD ["forever", "build/index.js"]
