import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { ProdutoEntity } from './produto.entity';

@Entity({ name: 'produto_imagens' })
export class ProdutoImagemEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'url', length: 100, nullable: false })
  url: string;

  @Column({ name: 'descricao', length: 100, nullable: false })
  descricao: string;

  @ManyToOne(
    () => ProdutoEntity, //Executa a Entidade de relacionamento
    (produto) => produto.imagens, //Ao ser executada a entidade, aponta para o atributo onde terá o relacionamento
    { 
      orphanedRowAction:'delete', //Se não houver nenhum relacionamento de produto para essa imagem, ela será deletada
      onDelete: 'CASCADE', //Se deletar produto, também deleta essa imagem
      onUpdate: 'CASCADE' //Se alterar produto, também altera essa imagem
    }
  )
  produto: ProdutoEntity;
}