import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProdutoEntity } from "./produto.entity";
import { Repository } from "typeorm";
import { ListaProdutoDTO } from "./dto/ListaProduto.dto";
import { AtualizaProdutoDTO } from "./dto/AtualizaProduto.dto";
import { CriaProdutoDTO } from "./dto/CriaProduto.dto";

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>
  ) {}

  async criaProduto(produto: CriaProdutoDTO) {
    const produtoEntity = new ProdutoEntity();

    //Ao usar Object.assign é interessante declarar que 'produto' que vem de CriaProdutoDTO é (da mesma estrutura) que ProdutoEntity. E pra isso tem que usar o 'as' como abaixo
    Object.assign(produtoEntity, produto as ProdutoEntity); 

    return await this.produtoRepository.save(produtoEntity);
  }

  async listaProdutos() {
    const produtosSalvos = await this.produtoRepository.find();
    const produtosLista = produtosSalvos.map(
      (produto) => 
        new ListaProdutoDTO(
          produto.id,
          produto.nome,
          produto.quantidadeDisponivel,
          produto.caracteristicas,
          produto.imagens
        )
    );
    return produtosLista;
  }

  async atualizaProduto(id: string, produtoAtualizado: AtualizaProdutoDTO) {
    const entityName = await this.produtoRepository.findOneBy({ id });

    if(entityName === null) {
      throw new NotFoundException('O produto não foi encontrado');
    }

    Object.assign(entityName, produtoAtualizado as ProdutoEntity); //Transferindo dados de um objeto para outro
    return await this.produtoRepository.save(entityName);
  }

  async deletaProduto(id: string) {
    const resultado = await this.produtoRepository.delete(id);

    if (!resultado.affected) {
      throw new NotFoundException('O produto não foi encontrado');
    }
  }

}