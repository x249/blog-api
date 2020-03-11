# Blog API

[![Build Status](https://travis-ci.com/x249/blog-api.svg?branch=master)](https://travis-ci.com/x249/blog-api)
[![codecov](https://codecov.io/gh/x249/blog-api/branch/master/graph/badge.svg)](https://codecov.io/gh/x249/blog-api)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=x249_blog-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=x249_blog-api)

A blog API built with Fastify and Objection.js (Knex-based ORM)

## Features

This API was built with the following technologies/paradigms/philosophies:

- TypeScript
- Fastify
- Objection.js
- Argon2
- JWT Authentication & Authorization
- Security & performance best-practices
- Scalability

## Requirements

- Node.js >= 11 (LTS preferable)
- PostgreSQL > 9
- Argon2 build tools. See: [Building Argon2](https://www.npmjs.com/package/argon2)

### Optional

- Docker >= 18

## Build setup

```bash
$ yarn install
# install dependencies

$ yarn dev
# hot reloading server

$ yarn build
# build ts files

$ yarn start
# production server
```

## Environment Variables (\* = required)

```bash
*NODE_ENV=development
*PORT=3000
*SECRET='SUPER_SECRET' # JWT Secret
*DATABASE_URL='postgres://blog-user:password@localhost:5432/blog-prod'
LOG_LEVEL='info'
DISABLE_LOGGING=false
```

## License

MIT
