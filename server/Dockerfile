FROM ruby:3.0.3 AS sukify_backend

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs python3-pip ffmpeg

RUN pip3 install youtube-dl

WORKDIR /sukify

COPY Gemfile /sukify/Gemfile
COPY Gemfile.lock /sukify/Gemfile.lock

RUN bundle install

CMD [ "rails", "server" ]
