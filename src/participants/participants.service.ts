import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Participants } from './participants.entity';

@Injectable()
export class ParticipantsService {
  constructor(
    @InjectRepository(Participants)
    private projectsRepository: Repository<Participants>,
  ) {}

  async create(id_proyecto: number, id_usuario: number, rol: string): Promise<Participants> {
    const participant = this.projectsRepository.create({
      id_proyecto,
      usuario: { id_usuario: id_usuario },
      rol,
    });
    return this.projectsRepository.save(participant);
  }

  async findAll() {
    return this.projectsRepository.find();
  }

  async findOne(id_usuario: number, id_proyecto: number): Promise<Participants | null> {
    return this.projectsRepository.findOne({ where: { id_usuario, id_proyecto } });
  }

  async findByProyecto(id_proyecto: number): Promise<Participants[]> {
  return this.projectsRepository.find({
    where: { id_proyecto },
    relations: ['usuario'], // Asegúrate de incluir esta relación si la usas
  });
  }

  async update(id_usuario: number, id_proyecto: number, rol: string) {
    await this.projectsRepository.update({ id_usuario, id_proyecto }, { rol });
    return this.findOne(id_usuario, id_proyecto);
  }

  async remove(id_usuario: number, id_proyecto: number) {
    return this.projectsRepository.delete({ id_usuario, id_proyecto });
  }
}