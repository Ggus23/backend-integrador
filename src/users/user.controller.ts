/**
 * Controlador de Proyectos
 */
import { Controller, Post, Get, Put, Delete, Body,Param } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly projectsService: UsersService) {}

  @Post('create')
  async create(@Body('nombre') nombre: string, @Body('email') email: string, @Body('contrasena_hasheada') contrasena_hasheada: string, @Body('contrasena_hasheada') rol: string) {
    return this.projectsService.create(nombre, email, contrasena_hasheada, rol);
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
  async update(@Param('id') id: number, @Body('nombre') nombre: string, @Body('email') email: string, @Body('contrasena_hasheada') contrasena_hasheada: string, @Body('contrasena_hasheada') rol: string) {
    return this.projectsService.update(id, nombre, email, contrasena_hasheada, rol);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.projectsService.remove(id);
  }
} 