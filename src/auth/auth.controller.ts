/**
 * Controlador de Autenticación
 */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
      @Body('username') nombre: string, // Aquí recibe el nombre en lugar de un ID
      @Body('password') contrasena: string,
  ) {
      const user = await this.authService.validateUser(nombre, contrasena);
  
      if (!user) {
          throw new Error('Credenciales inválidas');
      }
  
      return this.authService.login(user);
  }
}