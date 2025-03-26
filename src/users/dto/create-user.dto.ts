import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  contrasena_hasheada: string;

  @IsString()
  rol: string;

  @IsString()
  colegio: string; // Cambia a string
}