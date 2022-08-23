FROM node:latest

WORKDIR /web/frontend-ts

COPY package.json package-lock.json ./

RUN npm install
RUN npm install react-scripts

COPY . ./
EXPOSE 3000
