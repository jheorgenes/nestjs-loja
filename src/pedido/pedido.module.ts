import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PedidoEntity, UsuarioEntity])], //Importando as entidades que contém relacionamentos
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
