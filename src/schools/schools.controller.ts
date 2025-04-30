import { Controller, Get, UseFilters } from '@nestjs/common';
import { SchoolService } from './schools.service';

export interface ColegioInfo {
  id: string;
  nombre: string;
  distrito?: string;
  zona?: string;
}

@Controller('schools') // Define el prefijo de la ruta
export class SchoolController {
  constructor(private readonly colegiosService: SchoolService) {}

  @Get() // Mapea la petición GET a esta función
  async getColegios(): Promise<ColegioInfo[]> {
    return this.colegiosService.findAll();
  }
}