/**
 * Servicio de Intercambio Cultural
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CulturalExchange } from './cultura-exchange.entity';
import { Repository } from 'typeorm';
@Injectable()
export class CulturalExchangeService {
  constructor(
    @InjectRepository(CulturalExchange)
    private culturalExchangeRepository: Repository<CulturalExchange>,
  ) {}

  async create(tipo_contenido: string, descripcion: string) {
    const exchange = this.culturalExchangeRepository.create({tipo_contenido, descripcion });
    return this.culturalExchangeRepository.save(exchange);
  }
  async findAll() {
    return this.culturalExchangeRepository.find();
  }

  async findOne(id: number) {
    return this.culturalExchangeRepository.findOne({ where: { id } });
  }

  async update(id: number, tipo_contenido: string, descripcion: string) {
    await this.culturalExchangeRepository.update(id, { tipo_contenido, descripcion });
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.culturalExchangeRepository.delete(id);
  }
}
