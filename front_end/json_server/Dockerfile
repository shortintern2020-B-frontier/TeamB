FROM node:latest

ENV JSON_SERVER_PORT=8000

RUN yarn add -D json-server json-server-auth

COPY ./db_template.json ./db.json
COPY ./users_template.json ./users.json
ADD ./server.js ./server.js
# CMD ./node_modules/.bin/json-server-auth --watch db.json --port $JSON_SERVER_PORT --host 0.0.0.0
CMD node ./server.js
