import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface UsuarioPayload {
  sub: string;
  nomeUsuario: string
}

@Injectable()
export class AutenticacaoService {

  constructor(
    private readonly usuarioService: UsuarioService,
    private jwtService: JwtService
  ) {}

  async login(email: string, senhaInserida: string) {
    const usuario = await this.usuarioService.buscaPorEmail(email);

    // Compara a senha inserida com a senha do banco de dados
    const usuarioFoiAutenticado = await bcrypt.compare(
      senhaInserida,
      usuario.senha
    );

    if(!usuarioFoiAutenticado) {
      throw new UnauthorizedException('O email ou a senha está incorreto')
    }

    //Determina o payload com o id do usuário e o nome
    const payload: UsuarioPayload = {
      sub: usuario.id, // subject = sujeito
      nomeUsuario: usuario.nome
    }

    // Serviço do jwtService faz o login com o signAsync(recebendo o payload montado como argumento)
    return {
      token_acesso: await this.jwtService.signAsync(payload),
    }
  }
}
