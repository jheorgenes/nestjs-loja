import { IsArray, IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, MaxLength, Min, ValidateNested, IsUrl, ArrayMinSize } from "class-validator";
import { Type } from "class-transformer";

export class CaracteristicaProdutoDTO {

  @IsString()
  @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
  descricao: string;
}

export class ImagemProdutoDTO {

  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string;
}

export class CriaProdutoDTO {

  @IsUUID(undefined, { message: 'ID do usuário inválido' })
  usuarioId: string;

  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false }) //Só 2 caracteres após a vírgula, não pode ser vazio e nem infinito
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  // @IsPositive({ message: 'O valor precisa ser positivo' })
  valor: number;

  @IsNumber()
  @Min(0, { message: 'Quantidade Disponível mínima inválida' })
  quantidade: number;

  @IsString({ message: 'Descrição deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia' })
  @MaxLength(1000, { message: 'Descrição não pode ter mais que 1000 caracteres' })
  descricao: string;

  @ValidateNested()
  @IsArray()
  // @ArrayMinSize(3)
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

  // @IsDateString()
  // dataCriacao: Date;

  // @IsDateString()
  // dataAtualizacao: Date;
}