import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from './resources.entity';
@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resource)
    private resourcesRepository: Repository<Resource>,
  ) {}

  async create(tipo_proyecto: string, url: string) {
    const resource = this.resourcesRepository.create({ tipo_proyecto, url });
    return this.resourcesRepository.save(resource);
  }
  async findAll() {
    return this.resourcesRepository.find();
  }

  async findOne(id_resource: number) {
    return this.resourcesRepository.findOne({ where: { id_resource } });
  }

  async update(id_resource: number, tipo_proyecto: string, url: string) {
    await this.resourcesRepository.update(id_resource, { tipo_proyecto, url });
    return this.findOne(id_resource);
  }

  async remove(id: number) {
    return this.resourcesRepository.delete(id);
  }
}

