import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from './../usuario.repository';
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

@Injectable()
@ValidatorConstraint({ async: true }) //Espera a validação terminar para depois retornar uma resposta
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {

  constructor(private usuarioRepository: UsuarioRepository) {}

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const usuarioComEmailExiste = await this.usuarioRepository.existeComEmail(value); //Se false, passou na validação, senão retorna excessão do validator.
    return !usuarioComEmailExiste; //Aqui precisa retornar true se passar na validação sem erros
  }
  
}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: EmailEhUnicoValidator
    });
  }
}