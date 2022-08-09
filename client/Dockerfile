FROM node:lts-alpine as build
WORKDIR /sukify
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /sukify/dist /usr/share/nginx/html
