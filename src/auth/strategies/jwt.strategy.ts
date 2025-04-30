// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Token desde "Authorization: Bearer ..."
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secreto123', // Usa tu clave
    });
  }

  async validate(payload: any) {
    return {
      id_usuario: payload.id_usuario,
      nombre: payload.nombre,
      email: payload.email,
      rol: payload.rol,
    };
  }
}
