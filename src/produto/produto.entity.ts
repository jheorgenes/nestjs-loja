import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn, 
  OneToMany
} from 'typeorm'
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity';
import { ProdutoImagemEntity } from './produto-imagem.entity';

@Entity({ name: 'produtos' })
export class ProdutoEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'usuario_id', length: 100, nullable: false })
  usuarioId: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'valor', nullable: false })
  valor: number;

  @Column({ name: 'quantidade_disponivel', nullable: false })
  quantidadeDisponivel: number;

  @Column({ name: 'descricao', length: 255, nullable: false })
  descricao: string;

  @Column({ name: 'categoria', length: 100, nullable: false })
  categoria: string;

  @OneToMany(
    () => ProdutoCaracteristicaEntity, //Executa a Entidade de relacionamento
    (produtoCaracteristicaEntity) => produtoCaracteristicaEntity.produto, //Ao ser executada a entidade, aponta para o atributo onde terá o relacionamento
    { cascade: true, eager: true } //cascade: true permite (ao criar um produto), que crie as características também. O eager é só pra visualizar ao consultar produto
  )
  caracteristicas: ProdutoCaracteristicaEntity[];

  @OneToMany(
    () => ProdutoImagemEntity, //Executa a Entidade de relacionamento
    (produtoImagemEntity) => produtoImagemEntity.produto, //Ao ser executada a entidade, aponta para o atributo onde terá o relacionamento
    { cascade: true, eager: true } //cascade: true permite (ao criar um produto), que crie as imagens também. O eager é só pra visualizar ao consultar produto
  )
  imagens: ProdutoImagemEntity[];
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}