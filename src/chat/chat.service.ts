// src/mensajes/mensajes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chats } from './chat.entity';
import { CreateMensajeDto } from './create-chat.dto';

@Injectable()
export class MensajesService {
  constructor(
    @InjectRepository(Chats)
    private readonly mensajeRepository: Repository<Chats>,
  ) {}

  // Crear un nuevo mensaje
  async create(createMensajeDto: CreateMensajeDto): Promise<Chats> {
    const mensaje = this.mensajeRepository.create(createMensajeDto);
    return await this.mensajeRepository.save(mensaje);
  }

  // Obtener todos los mensajes de un proyecto
  async findAllByProyecto(id_proyecto: number): Promise<Chats[]> {
    return await this.mensajeRepository.find({
      where: { proyecto: { id_proyecto: id_proyecto } },
      relations: ['usuario'], // Cargar la relación con el usuario
    });
  }

  // Obtener un mensaje por ID
  async findOne(id: number): Promise<Chats> {
    try {
      return await this.mensajeRepository.findOneOrFail({
        where: { id },
        relations: ['usuario', 'proyecto'], // Cargar relaciones
      });
    } catch (error) {
      throw new NotFoundException(`Mensaje con ID ${id} no encontrado`);
    }
  }

  // Eliminar un mensaje por ID
  async remove(id: number): Promise<void> {
    const result = await this.mensajeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Mensaje con ID ${id} no encontrado`);
    }
  }
}