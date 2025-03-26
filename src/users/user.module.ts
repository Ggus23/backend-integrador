// src/users/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { School } from 'src/schools/school.entity'; // Import School entity
import { UsersController } from './user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User, School])],
    controllers:[UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UserModule {}