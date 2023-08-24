import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn,
  ManyToOne, 
} from 'typeorm'
import { PedidoEntity } from './pedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';

@Entity({ name: 'itens_pedido' })
export class ItemPedidoEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({ name: 'preco_venda', nullable: false })
  precoVenda: number;

  @ManyToOne(
    () => PedidoEntity,
    (pedido) => pedido.itensPedido,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  pedido: PedidoEntity;

  /** 
   * Termo: { cascade: true }
   * Significado: O cascade:true é a forma que TypeORM faz referência ao processo de cascata, ou seja, é a opção específica que é configurada no relacionamento para habilitar o comportamento em cascata e automatizar as operações em registros filhos
  */
  @ManyToOne(
    () => ProdutoEntity,
    (produto) => produto.itensPedido,
    { cascade: ['update'] } //Significa que ao realizar operações em itemPedido, o produto também terá alterações (sejam campos específicos ou não, nesse caso será a quantidade disponível)
  )
  produto: ProdutoEntity;
}