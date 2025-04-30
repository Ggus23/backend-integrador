/**
 * Controlador de Proyectos
 */
import { Controller, Post, Get, Put, Delete, Body,Param, UseGuards, UnauthorizedException, Request, BadRequestException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project';
import { RequestWithUser } from 'src/auth/auth.types';
import { AuthGuard } from '@nestjs/passport';
interface UserPayload {
  id_usuario: number;
  nombre: string;
  email: string;
  contrasena_hasheada: string;
  rol: string;
  colegio: string;
  recursos: any[];
  participaciones: any[];
  // Agrega aquí las demás propiedades necesarias según el tipo User
}

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