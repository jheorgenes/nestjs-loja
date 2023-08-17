import { Injectable } from "@nestjs/common";
import { ProdutoEntity } from "./produto.entity";

@Injectable()
export class ProdutoRepository {
  private produtos: ProdutoEntity[] = [];

  async salvar(produto: ProdutoEntity) {
    this.produtos.push(produto);
    return produto;
  }

  async listar() {
    return this.produtos;
  }

  private buscaPorId(id: string) {
    const possivelProduto = this.produtos.find((produto) => produto.id === id);

    if(!possivelProduto) {
      throw new Error('Produto não existe');
    }

    return possivelProduto;
  }

  async atualiza(id: string, dadosProduto: Partial<ProdutoEntity>) {
    const produto = this.buscaPorId(id);
    const dadosNaoAtualizaveis = ['id', 'usuarioId', 'dataCriacao', 'dataAtualizacao'];
    
    Object
      .entries(dadosProduto)
      .forEach(([chave, valor]) => {
        if(dadosNaoAtualizaveis.includes(chave)) {
          return;
        }
        
        produto[chave] = valor;

        if(produto['dataAtualizacao']) {
          produto['dataAtualizacao'] = new Date();
        }
      })
    
    return produto;
  }

  async remove(id: string) {
    const produtoRemovido = this.buscaPorId(id);
    this.produtos = this.produtos.filter((produto) => produto.id !== id);
    return produtoRemovido;
  }
}