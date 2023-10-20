import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";

@Injectable()
export class UsuarioService {
  
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>
  ) {}

  async listaUsuarios() {
    const usuariosSalvos = await this.usuarioRepository.find();
    const usuariosLista = usuariosSalvos.map(
      (usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome)
    );

    return usuariosLista;
  }

  async buscaUsuarioPorId(id: string) {
    return await this.usuarioRepository.findOne({
      where: { id }
    })
  }

  async buscaPorEmail(email: string) {
    const checkEmail = await this.usuarioRepository.findOne({
      where: { email },
    });

    if (checkEmail === null)
      throw new NotFoundException('O email não foi encontrado.');

    return checkEmail;
  }


  async criaUsuario(usuario: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    
    Object.assign(usuarioEntity, usuario as UsuarioEntity);

    return await this.usuarioRepository.save(usuario);
  }

  // async atualizaUsuario(id: string, usuarioAtualizado: AtualizaUsuarioDTO) {
  //   await this.usuarioRepository.update(id, usuarioAtualizado);
  // }

  async atualizaUsuario(id: string, usuarioAtualizado: AtualizaUsuarioDTO) {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if(usuario === null) {
      throw new NotFoundException(`O usuário não foi encontrado`);
    }
 
     Object.assign(usuario, usuarioAtualizado as UsuarioEntity);
 
     return this.usuarioRepository.save(usuario);
   }
 

   async deletaUsuario(id: string) {
    const resultado = await this.usuarioRepository.delete(id);

    if (!resultado.affected) //resultado.affected diz quantos registros foram deletados do BD. Se o número deletado for 0 vai executar o if
      throw new NotFoundException('O usuário não foi encontrado.');
  }

}