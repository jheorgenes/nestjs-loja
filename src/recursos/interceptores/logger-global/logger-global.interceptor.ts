import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { RequisicaoComUsuario } from 'src/modulos/autenticacao/autenticacao.guard';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {

  constructor(private logger: ConsoleLogger) {}

  intercept(contexto: ExecutionContext, next: CallHandler): Observable<any> {
    //Obtendo o contexto do http
    const contextoHttp = contexto.switchToHttp(); 

    //Buscando uma requisição (seja um Request genérico ou o Request Interface configurado)
    const requisicao = contextoHttp.getRequest<Request | RequisicaoComUsuario>();
    const {path, method } = requisicao;

    const resposta = contextoHttp.getResponse<Response>();
    const { statusCode } = resposta;

    this.logger.log(`${method} ${path}`);

    const instantePreControlador = Date.now();

    /**
     * @returns o próximo handle (O próximo interceptador ou o backend (se houver acabado os interceptadores))
     * 
     * Aqui foi usado o pipe, que permite (além de retornar o próximo handle) executar o tap funcão do rxjs
     * O método tap permite executar uma função anônima(callback). Nessa função foi verificado se tem a string 'usuario' na requisição obtida pelo token
     * Retornando um registro de log com a informação de qual usuário está acessando aquela rota.
     * 
     * OBS: Só irá entrar nesse contexto porque no módulo (LoggerGlobalInterceptor) foi adicionado (de forma global) em app.module.ts.
     */
    return next
            .handle()
            .pipe(tap(() => {
                if('usuario' in requisicao) {
                  this.logger.log(`Rota acessada pelo usuário: ${requisicao.usuario.sub}`);
                }
                const tempoDeExecucaoDaRota = Date.now() - instantePreControlador;
                this.logger.log(`Resposta: status ${statusCode} - ${tempoDeExecucaoDaRota}ms`)
              }),
            );
  }
}
