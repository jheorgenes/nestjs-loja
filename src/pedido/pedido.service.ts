import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/statuspedido.enum';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { ItemPedidoEntity } from './itempedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';
import { AtualizaPedidoDTO } from './dto/AtualizaPedido.dto';

@Injectable()
export class PedidoService {

  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  private async buscaUsuario(id: string) {
    
    const usuario = await this.usuarioRepository.findOneBy({ id: id }); 

    if(usuario === null) {
      throw new NotFoundException('O usuário não foi encontrado');
    }
    return usuario;
  }
  
  private trataDadosDoPedido(dadosPedido: CriaPedidoDTO, produtosRelacionados: ProdutoEntity[]) {
    dadosPedido.itensPedido.forEach((itemPedido) => {

      const produtoRelacionado = produtosRelacionados.find((produto) => produto.id === itemPedido.produtoId);

      if(produtoRelacionado === undefined) {
        throw new NotFoundException(`O produto com id ${itemPedido.produtoId} não foi encontrado`);
      }

      if(itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
        throw new BadRequestException(`A quantidade solicitada (${itemPedido.quantidade}) é maior do que a disponível (${produtoRelacionado.quantidadeDisponivel}) para o produto ${produtoRelacionado.nome}`);
      }

    })
  }


  async cadastraPedido(usuarioId: string, dadosPedido: CriaPedidoDTO) {
    // Obtém o usuário que será relacionado ao pedido.
    const usuario = await this.buscaUsuario(usuarioId);

    // Obtém a lista de id de produtos passados no corpo da requisição de pedido
    const produtosIds = dadosPedido.itensPedido.map((itemPedido) => itemPedido.produtoId);
    // Busca no banco os produtos relacionados com os ids de produtos obtidos
    const produtosRelacionados = await this.produtoRepository.findBy({ id: In(produtosIds) }); //Parametro 'In' tem exatamente a mesma relação que o in do banco de dados e perceorre a lista de ids automaticamente

    //Definindo dados padrões de pedido
    const pedidoEntity = new PedidoEntity();
    pedidoEntity.status = StatusPedido.EM_PROCESSAMENTO;
    pedidoEntity.usuario = usuario;
    
    this.trataDadosDoPedido(dadosPedido, produtosRelacionados);

    //Gerando itensPedido a partir de dadosPedido
    const itensPedidoEntidades = dadosPedido.itensPedido.map((itemPedido) => {
      //Buscando produto no banco que está relacionado ao itemPedido
      const produtoRelacionado = produtosRelacionados.find((produto) => produto.id === itemPedido.produtoId);

      // Formando itemPedido
      const itemPedidoEntity = new ItemPedidoEntity();
      itemPedidoEntity.produto = produtoRelacionado!; //A esclamação declara pro ts que esse objeto não é undefined ou nulo
      itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
      itemPedidoEntity.quantidade = itemPedido.quantidade; //Esse valor vem do corpo da requisição de itemPedido
      itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade; //Ao algerar quantidadeDisponivel de itemPedido.produto, fará uma subtração (via cascata) da quantidade de produto.quantidadeDisponível
      return itemPedidoEntity;
    });

    //Obtendo o valor total do pedido
    const valorTotal = itensPedidoEntidades.reduce((total, item) => {
      return total + item.precoVenda * item.quantidade;
    }, 0);

    //Terminando de preencher os dados de pedido
    pedidoEntity.itensPedido = itensPedidoEntidades;
    pedidoEntity.valorTotal = valorTotal;

    const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);
    return pedidoCriado;
  }

  async buscaPedidosDoUsuario(usuarioId: string) {
    // Usa o repositório de pedido para filtrar os pedidos pelo usuário
    return this.pedidoRepository.find({
      where: {
        usuario: { id: usuarioId },
      },
      // Especifica o relacionamento de pedido com usuário apontando o campo usuario: true
      // Isso faz com que os dados retornados de pedido venham com a informação do usuário também
      relations: {
        usuario: true,
      },
    });
  }

  async atualizaPedido(id: string, dto: AtualizaPedidoDTO) {
    const pedido = await this.pedidoRepository.findOneBy({ id });

    if(pedido === null) {
      throw new NotFoundException(`O pedido não foi encontrado`);
    }

    Object.assign(pedido, dto);
    return await this.pedidoRepository.save(pedido);
  }
}
