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
  contrasena_hasheada: string;

  @IsString()
  rol: string;
  
  @IsString()
  colegio: string;
}
