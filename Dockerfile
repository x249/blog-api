FROM node:12.14.0-alpine3.11 AS builder

WORKDIR /app

# required for node-gyp
RUN apk add --virtual build-dependencies gcc g++ make python-dev

COPY package.json .

# required for argon2
RUN npm i -g node-gyp

RUN npm i

# some cleanup
RUN apk del build-dependencies

COPY . .

FROM node:12.14.0-alpine3.11

WORKDIR /app

COPY --from=builder . .

EXPOSE 3000

CMD ["yarn", "start"]