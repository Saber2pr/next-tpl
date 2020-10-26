# node
FROM node:14.5.0-alpine3.10

# mirror
RUN echo 'http://mirrors.aliyun.com/alpine/v3.5/main' > /etc/apk/repositories
RUN echo 'http://mirrors.aliyun.com/alpine/v3.5/community' >>/etc/apk/repositories

# timeZone
RUN apk update && apk add tzdata 
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 
RUN echo "Asia/Shanghai" > /etc/timezone

WORKDIR /app
COPY . /app

# npm
RUN npm config set registry 'https://registry.npm.taobao.org'
RUN npm i
RUN npm run build

# script
CMD [ "npm", "start" ]