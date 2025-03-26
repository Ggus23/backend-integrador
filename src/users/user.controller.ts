/**
 * Controlador de usuarios
 */
import { Controller, Post, Get, Put, Delete, Body,Param } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userservices: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userservices.create(createUserDto);
  }
  @Get()
  async findAll() {
    return this.userservices.findAll();
  }

  @Get(':id')
  async findOne(@Param('id_usuario') id_usuario: number) {
    return this.userservices.findOne(id_usuario);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body('nombre') nombre: string, @Body('email') email: string, @Body('contrasena_hasheada') contrasena_hasheada: string, @Body('contrasena_hasheada') rol: string) {
    return this.userservices.update(id, nombre, email, contrasena_hasheada, rol);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userservices.remove(id);
  }
} 