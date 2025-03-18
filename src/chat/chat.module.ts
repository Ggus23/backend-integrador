// src/mensajes/mensajes.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MensajesController } from './chat.controller';
import { MensajesService } from './chat.service';
import { Chats } from './chat.entity';
import { User } from '../users/user.entity'; // Importar la entidad Usuario
import { Project } from '../projects/projects.entity'; // Importar la entidad Proyecto

@Module({
  imports: [TypeOrmModule.forFeature([Chats, User, Project])], // Registrar las entidades
  controllers: [MensajesController],
  providers: [MensajesService],
})
export class ChatModule {}