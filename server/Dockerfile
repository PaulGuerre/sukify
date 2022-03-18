FROM ruby:3.0.3

RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

WORKDIR /sukify

COPY Gemfile /sukify/Gemfile
COPY Gemfile.lock /sukify/Gemfile.lock

RUN bundle install

CMD [ "rails", "server" ]
