export class RegisterDto {
    nombre: string;
    email: string;
    contrasena_hasheada: string;
    colegio: string;
    rol: string;
  }
  
  export class LoginDto {
    email: string;
    contrasena_hasheada: string;
    password: string;
  }