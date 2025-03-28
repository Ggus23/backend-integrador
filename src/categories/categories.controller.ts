// categorias/categorias.controller.ts
import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async obtenerCategorias(): Promise<CategoryDto[]> {
    return this.categoriesService.obtenerCategorias();
  }
}