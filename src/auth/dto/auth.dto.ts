import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @MinLength(5)
    nombre: string;
    @IsEmail()
    email: string;
    contrasena_hasheada: string;
    @IsString()
    colegio: string;
    @IsString()
    @MinLength(5)
    rol: string;
  }
  
  export class LoginDto {
    email: string;
    contrasena_hasheada: string;
    password: string;
  }