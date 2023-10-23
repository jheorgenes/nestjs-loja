import { Injectable, PipeTransform } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashearSenhaPipe implements PipeTransform {

  constructor(private configService: ConfigService) {}

  async transform(senha: string) {
    /**
     *  Anteriormente foi inicializado o node no terminal com o comando 'node'
     *  Lá foi rodado o seguinte comando: const bcrypt = require('bcrypt');
     *  Depois: bcrypt.genSaltSync(10);
     *  Então foi copiado a string de hash gerada e salvada no .env com chave 'SAL_SENHA'
     *  Para sair do terminal do node (digite: .exit)
     */
    const sal = this.configService.get<string>('SAL_SENHA'); 

    //Gera hash da senha com a senha e o sal
    const senhaHasheada = await bcrypt.hash(senha, sal!);

    return senhaHasheada;
  }
}