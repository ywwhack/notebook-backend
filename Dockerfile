FROM daocloud.io/node:0.10-onbuild
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install -g cnpm babel-cli && cnpm install
COPY . /usr/src/app
EXPOSE 80
ENTRYPOINT babel-node app.js