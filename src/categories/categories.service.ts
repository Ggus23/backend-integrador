// categorias/categorias.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CategoryDto } from './dto/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriasRepository: Repository<Category>,
  ) {}

  async obtenerCategorias(): Promise<CategoryDto[]> {
    const categorias = await this.categoriasRepository.find();
    return categorias.map((categoria) => this.mapToDto(categoria));
  }

  private mapToDto(category: Category): CategoryDto {
    return {
      id: category.id_categoria,
      nombre: category.nombre,
      descripcion: category.descripcion,
    };
  }
}