import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(4)
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  @Transform(({ value }) => value.trim())
  contrasena: string;

  @IsString()
  colegio: string;
  @IsString()
  @MinLength(4)
  rol: string; // Cambia a string
}
 