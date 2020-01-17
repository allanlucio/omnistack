FROM node:12.14.1-alpine3.11

RUN apk add --no-cache openssl bash nodejs npm freetype-dev libjpeg-turbo-dev libpng-dev yarn
RUN mkdir -p /home/node/app/node_modules && chown -R 1000:1000 /home/node/app

RUN touch /root/.bashrc | echo "PS1='\w\$'" >> /root/bashrc
RUN yarn global add expo-cli && export PATH="$(yarn global bin):$PATH"

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz


WORKDIR /home/node/app
# RUN npm install
USER node
# RUN chown -R www-data:www-data /var/www


EXPOSE 8080



CMD ["node", "app.js"]
