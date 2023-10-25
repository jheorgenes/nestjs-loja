import { Module } from "@nestjs/common";
import { ProdutoController } from "./produto.controller";
import { ProdutoRepository } from "./produto.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { ProdutoService } from "./produto.service";
import { CustomLoggerModule } from "src/recursos/interceptores/custom-logger/logger.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProdutoEntity]), //Injetando o TypeORMModule para reconhecer o repository de ProdutoEntity
    CustomLoggerModule
  ], 
  controllers: [ProdutoController],
  providers: [ProdutoRepository, ProdutoService]
})
export class ProdutoModule{}