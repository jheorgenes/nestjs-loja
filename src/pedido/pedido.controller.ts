import { Controller, Get, Post, Query } from '@nestjs/common';
import { PedidoService } from './pedido.service';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(@Query('usuarioId') usuarioId: string) {
    const object = await this.pedidoService.cadastraPedido(usuarioId);
    return object;
  }

  @Get()
  async buscaPedidosDoUsuario(@Query('usuarioId') usuarioId: string) {
    const pedidos = await this.pedidoService.buscaPedidosDoUsuario(usuarioId);
    return pedidos;
  }

  // @Put('/id')
  // async atualizaPedido() {
    
  // }
}
