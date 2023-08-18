import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { ProdutoEntity } from './produto.entity';

@Entity({ name: 'produto_caracteristicas' })
export class ProdutoCaracteristicaEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'descricao', length: 100, nullable: false })
  descricao: string;

  @ManyToOne(
    () => ProdutoEntity, //Executa a Entidade de relacionamento
    (produto) => produto.caracteristicas, //Ao ser executada a entidade, aponta para o atributo onde terá o relacionamento
    { 
      orphanedRowAction:'delete', //Se não houver nenhum relacionamento de produto para essa caracteristica, ela será deletada
      onDelete: 'CASCADE', //Se deletar produto, também deleta essa caracteristica
      onUpdate: 'CASCADE' //Se alterar produto, também altera essa caracteristica
    }
  )
  produto: ProdutoEntity;
}