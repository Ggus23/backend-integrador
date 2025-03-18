import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/user.entity'; // ✅ Importamos la entidad
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule], // ✅ Corregimos la importación
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}