import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { UsuarioService } from "./usuario.service";

@Controller('usuarios')
export class UsuarioController {

  constructor(
    private usuarioService: UsuarioService
  ) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    const usuarioEntity = await this.usuarioService.criaUsuario(dadosDoUsuario);

    return { 
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      mensagem: 'Usuário criado com sucesso' 
    }
  }

  @Get('/:id')
  async buscaUsuarioPorId(@Param('id') id: string) {
    return await this.usuarioService.buscaUsuarioPorId(id);
  }

  @Get()
  async listUsuarios() {
    const usuariosSalvos = await this.usuarioService.listaUsuarios();
    return usuariosSalvos;
  }

  @Put('/:id')
  async atualizaUsuario(@Param('id') id: string, @Body() novosDados: AtualizaUsuarioDTO) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(id, novosDados);
    return {
      usuario: usuarioAtualizado,
      mensagem: 'usuário atualizado com sucesso'
    }
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.deletaUsuario(id);
    return {
      usuario: usuarioRemovido,
      mensagem: 'usuário removido com sucesso'
    }
  }
}