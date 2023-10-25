import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AutenticacaoGuard, RequisicaoComUsuario } from '../autenticacao/autenticacao.guard';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { PedidoService } from './pedido.service';

@UseGuards(AutenticacaoGuard)
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(
    @Req() req: RequisicaoComUsuario,
    @Body() dadosDoPedido: CriaPedidoDTO
  ) {
    const usuarioId = req.usuario.sub; //Buscando o usuário do payload
    const pedidoCriado = await this.pedidoService.cadastraPedido(usuarioId, dadosDoPedido);
    return {
      mensagem: 'Pedido feito com sucesso',
      pedido: pedidoCriado
    };
  }

  // Desabilitado para buscar todos os pedidos de um determinado usuário
  // @Get()
  // async buscaTodosOsPedidos() {
  //   const todosOsPedidos = await this.pedidoService.buscarTodosOsPedidos();
  //   return todosOsPedidos;
  // }

  @Get('/:id')
  async buscaPedido(@Param('id') pedidoId: string) {
    return await this.pedidoService.buscaPedido(pedidoId);
  }

  @Get()
  async buscaPedidosDoUsuario(@Req() req: RequisicaoComUsuario) {
    const usuarioId = req.usuario.sub;
    const pedidos = await this.pedidoService.buscaPedidosDoUsuario(usuarioId);
    return {
      mensagem: 'Pedidos obtidos com sucesso',
      pedidos
    };
  }

  @Patch('/:id')
  async atualizaPedido(
    @Req() req: RequisicaoComUsuario,
    @Param('id') pedidoId: string,
    @Body() dadosAtualizacao: AtualizaPedidoDTO
  ) {
    const usuarioId = req.usuario.sub;
    return await this.pedidoService.atualizaPedido(pedidoId, dadosAtualizacao, usuarioId);
  }

  //Aqui vai o processo de deleção, que não será viável de ser realizado pelo fato de não ser interessante remover registros de pedidos.
  //Porém pode ser realizado o processo de cancelamento aqui, onde desativa o pedido.
}
