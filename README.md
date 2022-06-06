# Sukify
Sukify is a private music web server. Using Vue.js and Ruby On Rails, it allows you to add and listen to music from Youtube. Using Docker or not, you can install it via LAN or WAN !

## Features
Sukify lets you download music and create playlists. About the music player, you have the option to enable shuffle music mode or music repeat mode.
 
## Needed data
By using Sukify, you must provide authentication information: a username and a password. But also your Youtube Api Key. To get one, please visit this website : https://developers.google.com/youtube/v3/getting-started

## Installation
Docker is the best way to install Sukify. 

1. Install Docker : https://docs.docker.com/engine/install/
2. Install docker-compose : https://docs.docker.com/compose/install/
3. Clone this repo : ``git clone https://github.com/Paulobergine/sukify``
4. Update needed data into : [``docker-compose.yml``](https://github.com/Paulobergine/sukify/blob/d23ebe141112b8d7be23da38fa55f457a6d4d4e4/docker-compose.yml#L34-L36)
5. Run : ``docker-compose up -d --build``
6. Do not forget to check the api : http://localhost:3000/ and click buttons ``create database`` then ``run pending migrations``

### WAN config
Traefik fields are also included
Update Api base URL : [``client/src/services/ApiManager.js``](https://github.com/Paulobergine/sukify/blob/d37c21e3a3016a16801e7961817631eceff6c214/client/src/services/ApiManager.js#L4)
(https://api.sukify.example.com)


## Rendering
Login page :
![Screenshot 2022-05-13 at 17-04-37 Sukify](https://user-images.githubusercontent.com/56794631/168390186-7940e179-d54a-48ec-b745-e9be50fb4e32.png)


Musics page :
![Screenshot 2022-05-13 at 17-08-28 Sukify](https://user-images.githubusercontent.com/56794631/168390224-6148f0bf-4206-41a6-bd72-0b63441834f3.png)


Playlists page :
![Screenshot 2022-05-13 at 17-08-37 Sukify](https://user-images.githubusercontent.com/56794631/168390250-5cd2d2f3-71f6-4755-b253-d93bec8bc028.png)
