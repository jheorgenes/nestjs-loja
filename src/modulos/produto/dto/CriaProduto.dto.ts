import { 
  IsArray, 
  IsNotEmpty, 
  IsNumber, 
  IsString, 
  MaxLength, 
  Min, 
  ValidateNested, 
  IsUrl, 
  ArrayMinSize 
} from "class-validator";
import { Type } from "class-transformer";
import { ProdutoEntity } from "../produto.entity";

export class CaracteristicaProdutoDTO {

  id: string;

  @IsString()
  @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
  descricao: string;

  produto: ProdutoEntity;
}

export class ImagemProdutoDTO {

  id: string;

  @IsUrl()
  @MaxLength(100, { message: 'URL não pode ter mais que 100 caracteres' })
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string;

  produto: ProdutoEntity;
}

export class CriaProdutoDTO {

  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false }) //Só 2 caracteres após a vírgula, não pode ser vazio e nem infinito
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  valor: number;

  @IsNumber()
  @Min(0, { message: 'Quantidade Disponível mínima inválida' })
  quantidadeDisponivel: number;

  @IsString({ message: 'Descrição deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia' })
  @MaxLength(1000, { message: 'Descrição não pode ter mais que 1000 caracteres' })
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @IsString({ message: 'Categoria deve ser uma string' })
  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
  categoria: string;
}