// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Module({
  imports: [
    UserModule,
    ConfigModule, // Asegúrate de importar ConfigModule
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    JwtAuthGuard, // Correctamente colocado en providers
  ],
  controllers: [AuthController], // Solo el controlador aquí
  exports: [
    JwtModule, // Exporta JwtModule para su uso en otros módulos
    JwtAuthGuard, // Exporta el guardia
    AuthService, // Si otros módulos necesitan el AuthService
  ],
})
export class AuthModule {}