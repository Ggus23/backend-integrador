// src/auth/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtPayload } from "../auth.types";
import { School } from 'src/schools/school.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);
    
    if (!token) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token);
      // Asignamos solo el id_usuario para mantenerlo seguro
      request.user = { 
        id_usuario: payload.id_usuario,
        nombre: '',
        email: '',
        contrasena_hasheada: '',
        rol: '',
        colegio: null as unknown as School, // Add appropriate default value or adjust type
        recursos: [], // Add appropriate default value
        participaciones: [], // Add appropriate default value
        mensajes: [], // Add appropriate default value
        intercambiosCulturales: [] // Add appropriate default value
      };
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }

  private extractToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}