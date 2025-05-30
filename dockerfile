FROM node:alpine
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

# RUN npm install -g nodemon
# RUN npm i knex

ARG PORTA="8080"
ENV PORTA=$PORTA
EXPOSE $PORTA

CMD [ "npm", "start" ]