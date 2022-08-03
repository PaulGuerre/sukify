FROM ruby:3.1.2 AS sukify_backend

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs python3-pip ffmpeg

RUN pip3 install yt-dlp

WORKDIR /sukify

ENV USER=$USER

ENV PASSWORD=$PASSWORD

ENV YOUTUBE_API_KEY=$YOUTUBE_API_KEY

COPY Gemfile /sukify/Gemfile
COPY Gemfile.lock /sukify/Gemfile.lock

RUN bundle install

CMD [ "rails", "server" ]
