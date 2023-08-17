import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Injectable()
export class UsuarioRepository {
  
  private usuarios: UsuarioEntity[] = [];

  async salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  async listar() {
    return this.usuarios;
  }

  async existeComEmail(email: string) {
    const possivelUsuario = this.usuarios.find(
      usuario => usuario.email === email
    );

    return possivelUsuario !== undefined; //Retornará false se não encontrar na lista nenhum e-mail igual ao recebido
  }

  private buscaPorId(id: string) {
    const usuario = this.usuarios.find(
      usuario => usuario.id === id
    );

    if(!usuario) {
      throw new Error('Usuário não existe');
    }

    return usuario;
  }

  async atualiza(id: string, dadosDeAtualizacao: Partial<UsuarioEntity>) { //Partial<T> faz com que todas as propriedades de T sejam parâmetros opcionais.
    const usuario = this.buscaPorId(id);
    
    Object
      .entries(dadosDeAtualizacao) //Converte para um array com chave e valor
      .forEach(([chave, valor]) => { //Percorre a lista do objeto usando a chave e valor separadamente
        if(chave === 'id') { //Se a chave for igual a id, pula o laço
          return;
        }

        usuario[chave] = valor; //Atribui a cada propriedade de possivelUsuario (identificado pela [chave]) o valor obtido;
      });

    return usuario;
  }

  async remove(id: string) {
    const usuario = this.buscaPorId(id);

    this.usuarios = this.usuarios.filter(usuarioSalvo => usuarioSalvo.id !== id);

    return usuario;
  }
}