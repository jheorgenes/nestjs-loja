import { CriaUsuarioDTO } from "./CriaUsuario.dto";
import { PartialType } from "@nestjs/mapped-types";

//PartialType declara o mesmo dto herdado, porém com o adicional de @Optional em cada atributo
export class AtualizaUsuarioDTO extends PartialType(CriaUsuarioDTO) {}