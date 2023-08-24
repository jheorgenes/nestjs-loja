import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Response } from "express";


@Catch(HttpException)
export class FiltroDeExcecaoHttp implements ExceptionFilter {

  catch(excecao: HttpException, host: ArgumentsHost) {
    console.log(excecao);
    
    const contexto = host.switchToHttp(); //Pega o contexto do HTTP
    const resposta = contexto.getResponse<Response>(); //Pega o contexto da resposta

    const status = excecao.getStatus(); //Extrai o status
    const body = excecao.getResponse(); //Estrai o corpo

    // Monta a resposta com o status e o corpo em formato json
    resposta
      .status(status)
      .json(body);
  }
  
}