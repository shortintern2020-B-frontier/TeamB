FROM node:latest
EXPOSE 3000

WORKDIR /app
COPY ./webpack.config.js /app/webpack.config.js
COPY ./package.json /app/package.json
COPY ./.babelrc /app/.babelrc
COPY ./.eslintrc.js /app/.eslintrc.js

RUN yarn init -y
RUN yarn install

ENV CHOKIDAR_USEPOLLING=true

CMD ["./node_modules/.bin/webpack-dev-server", "--hot --watch-content-base"]

