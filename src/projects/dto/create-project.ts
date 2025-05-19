// src/projects/dto/create-project.dto.ts
import { MinLength, IsNumber, IsOptional } from "class-validator";

export class CreateProjectDto {
  @MinLength(6)
  nombre: string;

  @MinLength(6)
  descripcion: string;

  @MinLength(6)
  Obj_aprendizaje: string;

  @IsNumber()
  id_categoria: number;
  
  @IsNumber()
  @IsOptional() // Marcar como opcional ya que lo obtendremos del token
  id_usuario: number; // El signo ? indica que es opcional
}