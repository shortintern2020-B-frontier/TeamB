FROM node:latest

ENV JSON_SERVER_PORT=8000

RUN yarn add -D json-server

COPY ./db_template.json ./db.json
CMD ./node_modules/.bin/json-server --watch db.json --port $JSON_SERVER_PORT --host 0.0.0.0
