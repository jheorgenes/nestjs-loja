<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

# Dependêncies

```bash
$ npm i dotenv@16.0.3
```

### Comando para instalar o cli do typeorm e depois de configurado o data-source, ativá-lo
```bash
$ npm i -g typeorm@0.3.16
```
## Depois de configurado script no package.json para executar migration 
### o comando inicial que será executado 'typeorm-ts-node-esm -d src/db/data-source-cli.ts'

### Exibir migrations
```bash
$ npm run typeorm migration:show
```

### Gerar migrations
```bash
$ npm run typeorm migration:generate src/db/migrations/nome-da-migracao
```

### Executar migrations
```bash
$ npm run typeorm migration:run
```

### Desfazer ultima migration
```bash
$ npm run typeorm migration:revert
```


### Como gerar estrutura completa do crud com nest
```bash
$ npm g resource nome-entity --no-spec
```
// --no=spec significa que não vai criar arquivos de teste

### Cache-manager
```bash
$ npm i @nestjs/cache-manager@2.0.1 -E cache-manager@5.2.3 -E
```

### Cache-manager Redis
```bash
$ npm i cache-manager-redis-yet@4.1.2 -E
```

### bcrypt
```bash
$ npm i bcrypt@5.1.0 -E
$ npm i --save-dev @types/bcrypt
```

### Criando resourses sem testes
```bash
$ nest g resource <caminho/nome-resource> --no-spec
```

### JWT Token
```bash
$ npm i @nestjs/jwt@10.1.0 -E
```

### Gerando um guard
```bash
$ nest g guard modulos/autenticacao/autenticacao --no-spec
```

### Gerando um Interceptor
```bash
$ nest g itc recursos/interceptores/logger-global --no-spec
```


### Colors para colorir terminal
```bash
$ npm install colors
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
