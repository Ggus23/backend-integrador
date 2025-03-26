// src/schools/schools.controller.ts
import { Controller, Get } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { School } from './school.entity';

@Controller('schools')
export class SchoolsController {
  constructor(private schoolsService: SchoolsService) {}

  @Get()
  async findAll(): Promise<School[]> {
    return this.schoolsService.findAll();
  }
}