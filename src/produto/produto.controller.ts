import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProdutoRepository } from "./produto.repository";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";
import { ProdutoEntity } from "./produto.entity";
// import { v4 as uuid } from 'uuid';
import { randomUUID } from 'crypto';
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
// import { ListaProdutoDTO } from "./dto/ListaProduto.dto";

@Controller('produtos')
export class ProdutoController {

  constructor(private readonly produtoRepository: ProdutoRepository) {}

  @Post()
  async criaProduto(@Body() dadosProduto: CriaProdutoDTO) {
    const produto = new ProdutoEntity();
    // produtoEntity.id = uuid();
    produto.id = randomUUID();
    produto.usuarioId = dadosProduto.usuarioId;
    produto.nome = dadosProduto.nome;
    produto.valor = dadosProduto.valor;
    produto.quantidade = dadosProduto.quantidade;
    produto.descricao = dadosProduto.descricao;
    produto.categoria = dadosProduto.categoria;
    produto.caracteristicas = dadosProduto.caracteristicas;
    produto.imagens = dadosProduto.imagens;
    produto.dataCriacao = new Date();
    produto.dataAtualizacao = new Date();
    
    const produtoCadastrado = this.produtoRepository.salvar(produto);
    return produtoCadastrado;
  }

  // @Get()
  // async listProdutos() {
  //   const produtosSalvos = await this.produtoRepository.listar();
  //   const produtosLista = produtosSalvos.map(produto => new ListaProdutoDTO(produto));
  //   return produtosLista;
  // }
  @Get()
  async listProdutos() {
    return this.produtoRepository.listar();
  }

  @Put('/:id')
  async atualiza(@Param('id') id: string, @Body() dadosProdutos: AtualizaProdutoDTO) {
    const produtoAlterado = await this.produtoRepository.atualiza(id, dadosProdutos);

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: produtoAlterado
    }
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.produtoRepository.remove(id);

    return {
      mensagem: 'Produto removido com sucesso',
      produto: produtoRemovido
    }
  }
}