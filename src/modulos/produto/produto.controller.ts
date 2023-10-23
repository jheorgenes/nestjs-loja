import { CacheInterceptor } from '@nestjs/cache-manager';
import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ProdutoService } from './produto.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ProdutoEntity } from './produto.entity';

@Controller('produtos')
export class ProdutoController {

  constructor(
    private readonly produtoService: ProdutoService,
    @Inject(CACHE_MANAGER) private gerenciadorDeCache: Cache //Injetando um serviço de cache
  ) {}

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

  // Definindo cache de forma específica pro produto
  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async listaUm(@Param('id') id: string) {
    // Verificando se o produto está em cache.
    let produto = await this.gerenciadorDeCache.get<ProdutoEntity>(`produto-${id}`);

    // Se não tiver, busca o produto.
    if(!produto) {
      console.log('Obtendo produto do cache!');
      produto = await this.produtoService.listaUmProduto(id);

      // Armazena o produto em cache
      await this.gerenciadorDeCache.set(`produto-${id}`, produto);
    }

    return {
      mensagem: 'Produto obtido com sucesso',
      produto
    }
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