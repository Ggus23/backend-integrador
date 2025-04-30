import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.cookies['jwt'];

    if (!token) {
      throw new UnauthorizedException('No token found in cookies');
    }

    try {
      const payload = this.jwtService.verify(token);
      request['user'] = payload; // opcional, por si quieres acceder luego
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}