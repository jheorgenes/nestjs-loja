import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(
    @Query('usuarioId') usuarioId: string,
    @Body() dadosDoPedido: CriaPedidoDTO
  ) {
    const object = await this.pedidoService.cadastraPedido(usuarioId, dadosDoPedido);
    return object;
  }

  @Get()
  async buscaPedidosDoUsuario(@Query('usuarioId') usuarioId: string) {
    const pedidos = await this.pedidoService.buscaPedidosDoUsuario(usuarioId);
    return pedidos;
  }

  @Patch('/:id')
  async atualizaPedido(
    @Param('id') pedidoId: string,
    @Body() dadosAtualizacao: AtualizaPedidoDTO
  ) {
    return await this.pedidoService.atualizaPedido(pedidoId, dadosAtualizacao);
  }

  //Aqui vai o processo de deleção, que não será viável de ser realizado pelo fato de não ser interessante remover registros de pedidos.
  //Porém pode ser realizado o processo de cancelamento aqui, onde desativa o pedido.
}
