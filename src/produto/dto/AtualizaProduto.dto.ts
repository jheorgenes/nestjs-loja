import { 
  IsUUID,
  IsArray, 
  IsNotEmpty, 
  IsNumber, 
  IsString, 
  MaxLength, 
  Min, 
  ValidateNested, 
  IsOptional, 
  ArrayMinSize 
} from "class-validator";
import { Type } from "class-transformer";
import { CaracteristicaProdutoDTO, ImagemProdutoDTO } from "./CriaProduto.dto";

export class AtualizaProdutoDTO {

  @IsUUID(undefined, { message: 'ID do usuário inválido' })
  @IsOptional()
  usuarioId: string;

  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsOptional()
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false }) 
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  @IsOptional()
  valor: number;

  @IsNumber()
  @Min(0, { message: 'Quantidade Disponível mínima inválida' })
  @IsOptional()
  quantidade: number;

  @IsString({ message: 'Descrição deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia' })
  @MaxLength(1000, { message: 'Descrição não pode ter mais que 1000 caracteres' })
  @IsOptional()
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CaracteristicaProdutoDTO)
  @IsOptional()
  caracteristicas: CaracteristicaProdutoDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdutoDTO)
  @IsOptional()
  imagens: ImagemProdutoDTO[];

  @IsString({ message: 'Categoria deve ser uma string' })
  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
  @IsOptional()
  categoria: string;
}