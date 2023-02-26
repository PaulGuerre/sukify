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
6. Run : ``docker-compose run sukify_backend rake db:create`` then : ``docker-compose run sukify_backend rake db:migrate``

## WIP
