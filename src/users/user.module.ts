import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // ✅ Se importa la entidad User correctamente
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule], // ✅ Exportamos TypeOrmModule
})
export class UserModule {}