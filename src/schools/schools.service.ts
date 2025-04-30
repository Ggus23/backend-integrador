import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Si usas TypeORM
import { Repository } from 'typeorm'; // Si usas TypeORM
import { School } from './school.entity'; // Asegúrate de tener tu entidad Colegio
import { ColegioInfo } from '../types/types'; // Utiliza la interfaz importada

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School) // Si usas TypeORM
    private colegiosRepository: Repository<School>, // Si usas TypeORM
  ) {}

  async findAll(): Promise<ColegioInfo[]> {
    try {
      const colegios = await this.colegiosRepository.find({
        select: ['CODIGO_UE', 'UNIDAD_EDU', 'DISTRITO', 'ZONA'],
      });
  
      return colegios.map(colegio => ({
        id: colegio.CODIGO_UE,
        nombre: colegio.UNIDAD_EDU,
        distrito: colegio.DISTRITO || undefined,
        zona: colegio.ZONA || undefined,
        // nombreDescriptivo: `${colegio.UNIDAD_EDU} ${colegio.DISTRITO ? `(${colegio.DISTRITO})` : (colegio.ZONA ? `(${colegio.ZONA})` : '')}`.trim(), // Eliminar esta línea
      })).sort((a, b) => a.nombre.localeCompare(b.nombre)); // Ordenar por nombre
  
    } catch (error) {
      console.error('Error al obtener los colegios:', error);
      throw new Error('Error al cargar la lista de colegios.');
    }
  }
}