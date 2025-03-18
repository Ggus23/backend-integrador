// src/mensajes/mensajes.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Query,
  } from '@nestjs/common';
  import { MensajesService } from './chat.service';
  import { CreateMensajeDto } from './create-chat.dto';
  
  @Controller('Chats')
  export class MensajesController {
    constructor(private readonly mensajesService: MensajesService) {}
  
    // Crear un nuevo mensaje
    @Post()
    create(@Body() createMensajeDto: CreateMensajeDto) {
      return this.mensajesService.create(createMensajeDto);
    }
  
    // Obtener todos los mensajes de un proyecto
    @Get()
    findAllByProyecto(@Query('proyecto') id_proyecto: number) {
      return this.mensajesService.findAllByProyecto(id_proyecto);
    }
  
    // Obtener un mensaje por ID
    @Get(':id')
    findOne(@Param('id') id: number) {
      return this.mensajesService.findOne(id);
    }
  
    // Eliminar un mensaje por ID
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.mensajesService.remove(id);
    }
  }