/**
 * Controlador de Proyectos
 */
import { Controller, Post, Get, Put, Delete, Body,Param, UseGuards, UnauthorizedException, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';
import { RequestWithUser } from 'src/auth/auth.types';
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
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Request() req: RequestWithUser
  ) {
    if (!req.user?.id_usuario) {
      throw new UnauthorizedException('Usuario no autenticado');
    }

    return this.projectsService.create({
      ...createProjectDto,
      id_usuario: req.user.id_usuario // Usamos el nombre correcto de la propiedad
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