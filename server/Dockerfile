FROM node:lts-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

COPY . .

RUN npx prisma generate

RUN npm run tsc

EXPOSE 3002

CMD ["node", "dist/server.js"]
