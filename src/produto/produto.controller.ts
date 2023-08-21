import { ProdutoService } from './produto.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ProdutoEntity } from "./produto.entity";
import { randomUUID } from 'crypto';
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";

@Controller('produtos')
export class ProdutoController {

  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criaProduto(@Body() dadosProduto: CriaProdutoDTO) {
    const produtoCadastrado = this.produtoService.criaProduto(dadosProduto);
    return produtoCadastrado;
  }

  @Get()
  async listaTodos() {
    return this.produtoService.listaProdutos();
  }

  @Put('/:id')
  async atualiza(@Param('id') id: string, @Body() dadosProdutos: AtualizaProdutoDTO) {
    const produtoAlterado = await this.produtoService.atualizaProduto(id, dadosProdutos);

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: produtoAlterado
    }
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.produtoService.deletaProduto(id);

    return {
      mensagem: 'Produto removido com sucesso',
      produto: produtoRemovido
    }
  }
}