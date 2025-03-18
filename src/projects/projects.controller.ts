/**
 * Controlador de Proyectos
 */
import { Controller, Post, Get, Put, Delete, Body,Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post('create')
  async create(@Body('nombre') nombre: string, @Body('descripcion') descripcion: string, @Body('fecha_creacion') fecha_creacion: Date) {
    return this.projectsService.create(nombre, descripcion, fecha_creacion);
  }
  @Get()
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.projectsService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body('nombre') nombre: string, @Body('descripcion') descripcion: string, @Body('fecha_creacion') fecha_creacion: Date) {
    return this.projectsService.update(id, nombre, descripcion, fecha_creacion);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.projectsService.remove(id);
  }
} 