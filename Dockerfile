FROM node: 6.1.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install -g cnpm babel-cli && cnpm install
COPY . /usr/src/app
EXPOSE 80
ENTRYPOINT babel-node app.js