import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { UsuarioPayload } from './autenticacao.service';

export interface RequisicaoComUsuario extends Request {
  usuario: UsuarioPayload;
}

@Injectable()
export class AutenticacaoGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(contexto: ExecutionContext): Promise<boolean> { 
    const request = contexto.switchToHttp().getRequest<RequisicaoComUsuario>(); //Extraindo o request do tipo RequisicaoComUsuario
    const token = this.extrairTokenDoCabecalho(request); //Extraíndo o token

    if(!token) {
      throw new UnauthorizedException('Erro de autenticação');
    }

    try {
      const payload: UsuarioPayload = await this.jwtService.verifyAsync(token); //Validando o token
      request.usuario = payload; //Injetando na requisição, o payload
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('JWT Inválido'); //Retornando 
    }

    return true;
  }

  private extrairTokenDoCabecalho(request: Request): string | undefined {
    const [ tipo, token ] = request.headers.authorization?.split(' ') ?? [];
    return tipo === 'Bearer' ? token : undefined;
  }
}