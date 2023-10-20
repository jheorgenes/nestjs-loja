import { CacheInterceptor } from '@nestjs/cache-manager';
import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ProdutoService } from './produto.service';

@Controller('produtos')
export class ProdutoController {

  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criaProduto(@Body() dadosProduto: CriaProdutoDTO) {
    const produtoCadastrado = this.produtoService.criaProduto(dadosProduto);
    return produtoCadastrado;
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  async listaTodos() {
    return this.produtoService.listaProdutos();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async listaUm(@Param('id') id: string) {

    const produto = this.produtoService.listaUmProduto(id);

    console.log("Produto buscado => ");
    
    return produto;
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