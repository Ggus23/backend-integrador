import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
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