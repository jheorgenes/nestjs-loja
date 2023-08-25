import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioRepository } from './../usuario.repository';
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UsuarioService } from '../usuario.service';

@Injectable()
@ValidatorConstraint({ async: true }) //Espera a validação terminar para depois retornar uma resposta
export class EmailEhUnicoValidator implements ValidatorConstraintInterface {

  // constructor(private usuarioRepository: UsuarioRepository) {}
  constructor(private usuarioService: UsuarioService) {}

  // async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
  //   const usuarioComEmailExiste = await this.usuarioRepository.existeComEmail(value); //Se false, passou na validação, senão retorna excessão do validator.
  //   return !usuarioComEmailExiste; //Aqui precisa retornar true se passar na validação sem erros
  // }

  async validate(value: any): Promise<boolean> {
    try {
      const usuarioComEmailExiste = await this.usuarioService.buscaPorEmail(
        value,
      );

      return !usuarioComEmailExiste;
    } catch (erro) {
      if (erro instanceof NotFoundException) {
        return true;
      }

      throw erro;
    }
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