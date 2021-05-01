FROM node:14

#create app directory
WORKDIR /usr/src/app/

#Install app dependencies
COPY package*.json ./

RUN npm install

#Bundle app source
COPY . .

EXPOSE 8080

CMD["node","index.js"]
