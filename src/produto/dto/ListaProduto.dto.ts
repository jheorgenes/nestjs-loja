import { ProdutoEntity } from "../produto.entity";

class ListaCaracteristicaProdutoDTO {
  nome: string;
  descricao: string;
}

class ListaImagemProdutoDTO {
  url: string;
  descricao: string;
}

export class ListaProdutoDTO {

  constructor(produto: ProdutoEntity){
    this.id = produto.id;
    this.usuarioId = produto.id;
    this.nome = produto.nome;
    this.valor = produto.valor;
    this.quantidade = produto.quantidade;
    this.descricao = produto.descricao;
    this.categoria = produto.categoria;
    this.caracteristicas = produto.caracteristicas;
    this.imagens = produto.imagens;
    this.dataCriacao = produto.dataCriacao;
    this.dataAtualizacao = produto.dataAtualizacao;
  }

  id: string;
  usuarioId: string;
  nome: string;
  valor: number;
  quantidade: number;
  descricao: string;
  categoria: string;
  caracteristicas: ListaCaracteristicaProdutoDTO[];
  imagens: ListaImagemProdutoDTO[];
  dataCriacao: Date;
  dataAtualizacao: Date;
}