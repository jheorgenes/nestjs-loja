import { ClassSerializerInterceptor, ConsoleLogger, Module } from '@nestjs/common';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { ProdutoModule } from './modulos/produto/produto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigService } from './config/postgres.config.service';
import { ConfigModule } from '@nestjs/config';
import { PedidoModule } from './modulos/pedido/pedido.module';
import { FiltroDeExcecaoGlobal } from './recursos/filtros/filtro-de-excecao-global';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AutenticacaoModule } from './modulos/autenticacao/autenticacao.module';
import { LoggerGlobalInterceptor } from './recursos/interceptores/logger-global/logger-global.interceptor';

@Module({
  imports: [
    UsuarioModule, 
    ProdutoModule,
    PedidoModule,
    // Cache usando propriedades nativas do nestjs
    // CacheModule.register({ //Apontando para realizar registros
    //   isGlobal: true, // De forma global
    //   ttl: 10000 //guardando na memória as informações pelo tempo determinado em ttl
    // }),
    //Cache configurado usando o Redis
    CacheModule.registerAsync({ 
      useFactory: async () => ({
        store: await redisStore({ //Usando o RedisStore
          ttl: 10 * 1000 //Determinando o tempo de cache
        })
      }),
      isGlobal: true
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService]
    }),
    AutenticacaoModule,
  ],
  providers: [ //Definindo de forma global os filtros de Exceção
    {
      provide: APP_FILTER, //Adicionando um filtro de excessão próprio
      useClass: FiltroDeExcecaoGlobal
    },
    {
      provide: APP_INTERCEPTOR, //Definindo interceptores para funcionar a anotação @Exclude()
      useClass: ClassSerializerInterceptor
    },
    {
      provide: APP_INTERCEPTOR, //Definindo interceptor para registro de logs no terminal
      useClass: LoggerGlobalInterceptor
    },
    ConsoleLogger
  ]
})
export class AppModule {}
