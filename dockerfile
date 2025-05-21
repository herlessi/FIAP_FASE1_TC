FROM node:alpine
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

RUN npm install -g nodemon

ARG PORTA="8000"
ENV PORTA=$PORTA
EXPOSE $PORTA

CMD [ "npm", "start" ]