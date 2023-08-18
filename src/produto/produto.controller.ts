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
    const produto = new ProdutoEntity();

    produto.id = randomUUID();
    produto.nome = dadosProduto.nome;
    produto.usuarioId = dadosProduto.usuarioId;
    produto.valor = dadosProduto.valor;
    produto.quantidade = dadosProduto.quantidade;
    produto.descricao = dadosProduto.descricao;
    produto.categoria = dadosProduto.categoria;
    produto.caracteristicas = dadosProduto.caracteristicas;
    produto.imagens = dadosProduto.imagens;
    
    const produtoCadastrado = this.produtoService.criaProduto(produto);
    return produtoCadastrado;
  }

  @Get()
  async listProdutos() {
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