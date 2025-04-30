import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  contrasena: string;

  @IsString()
  colegio: string; // Cambia a string

  @IsString()
  rol: string; // Cambia a string
}