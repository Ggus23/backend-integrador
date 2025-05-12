/**
 * Controlador de Proyectos
 */
import { Controller, Post, Get, Put, Delete, Body,Param, UseGuards, UnauthorizedException, Request, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project';
import { RequestWithUser } from 'src/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
  if (!createProjectDto.id_usuario) {
    throw new BadRequestException('id_usuario es requerido');
  }

  return this.projectsService.create({
    ...createProjectDto,
    id_usuario: Number(createProjectDto.id_usuario)
  });
}
  @Get()
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id_proyecto')
  async findOne(@Param('id_proyecto') id_proyecto: number) {
    return this.projectsService.findOne(id_proyecto);
  }
  @Get('usuario/:id_proyecto')
  findByUser(@Param('id_proyecto', ParseIntPipe) id_proyecto: number) {
    return this.projectsService.findByUser(id_proyecto);
  }
  @Put(':id_proyecto')
  async update(@Param('id_proyecto') id_proyecto: number, @Body('nombre') nombre: string, @Body('descripcion') descripcion: string, @Body('fecha_creacion') fecha_creacion: Date) {
    return this.projectsService.update(id_proyecto, nombre, descripcion, fecha_creacion);
  }

  @Delete(':id_proyecto')
  async remove(@Param('id_proyecto') id_proyecto: number) {
    return this.projectsService.remove(id_proyecto);
  }
} 