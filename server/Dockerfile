FROM node:12.12.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN apt-get update -qq && \
  apt-get install -y mariadb-client vim
