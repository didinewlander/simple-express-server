FROM node:20-alpine3.19

WORKDIR /

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]