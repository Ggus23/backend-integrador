import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './school.entity';

@Injectable()
export class SchoolsService {
  constructor(
    @InjectRepository(School)
    private schoolsRepository: Repository<School>,
  ) {}

  async findAll(): Promise<School[]> {
    return this.schoolsRepository.find();
  }
}