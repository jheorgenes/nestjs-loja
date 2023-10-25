import { ArgumentsHost, Catch, ConsoleLogger, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";


@Catch() //Tipo de excessão que será capturada
export class FiltroDeExcecaoGlobal implements ExceptionFilter {

  constructor(
    private adapterHost: HttpAdapterHost,
    private loggerNativo: ConsoleLogger
  ) {}

  catch(excecao: unknown, host: ArgumentsHost) {
    this.loggerNativo.error(excecao); //Gerando Logs dos erros que ocorrem na requisição
    console.error(excecao);

    const { httpAdapter } = this.adapterHost;
    
    const contexto = host.switchToHttp(); //Pega o contexto do HTTP
    const resposta = contexto.getResponse(); //Pega o contexto da resposta
    const requisicao = contexto.getRequest();

    if('usuario' in requisicao) {
      this.loggerNativo.log(`Rota acessada pelo usuário ${requisicao.usuario.sub}`)
    }

    const { status, body } = 
      excecao instanceof HttpException //Se for do tipo HttpException, captura e retorna status e body
        ? {
          status: excecao.getStatus(),
          body: excecao.getResponse()
        } : { //Se não retorna internal_server_error
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          body: {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(requisicao)
          }
        }

    // Retorna uma resposta
    httpAdapter.reply(resposta, body, status);
  }
  
}