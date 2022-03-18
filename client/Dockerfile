FROM node:lts-alpine

WORKDIR /sukify

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "serve"]
