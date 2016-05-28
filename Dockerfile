FROM daocloud.io/node:6.2.0
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install -g cnpm babel-cli
RUN cnpm install
COPY . /usr/src/app
EXPOSE 80
ENTRYPOINT babel-node app.js