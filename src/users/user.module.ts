// src/users/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { School } from 'src/schools/school.entity';
import { UsersController } from './user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User, School])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [TypeOrmModule, UsersService], // Agrega esta línea
})
export class UserModule {}