/**
 * Servicio de Proyectos
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entity';
@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(nombre: string, descripcion: string, fecha_creacion: Date): Promise<Project> {
    const project = this.projectsRepository.create({ nombre, descripcion, fecha_creacion});
    return this.projectsRepository.save(project);
  }
  async findAll() {
    return this.projectsRepository.find();
  }

  async findOne(id_proyecto: number) {
    return this.projectsRepository.findOne({ where: { id_proyecto } });
  }

  async update(id_proyecto: number, nombre: string, descripcion: string, fecha_creacion: Date) {
    await this.projectsRepository.update(id_proyecto, { nombre, descripcion, fecha_creacion});
    return this.findOne(id_proyecto);
  }

  async remove(id: number) {
    return this.projectsRepository.delete(id);
  }
}
