import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ParticipantsService } from './participants.service';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly projectsService: ParticipantsService) {}

  @Post()
  create(@Body() body: { id_proyecto: number; id_usuario: number; rol: string }) {
    return this.projectsService.create(body.id_proyecto, body.id_usuario, body.rol);
  }

  @Get()
  findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id_usuario/:id_proyecto')
  findOne(
    @Param('id_usuario') id_usuario: number,
    @Param('id_proyecto') id_proyecto: number,
  ) {
    return this.projectsService.findOne(id_usuario, id_proyecto);
  }

  @Delete(':id_usuario/:id_proyecto')
  remove(
    @Param('id_usuario') id_usuario: number,
    @Param('id_proyecto') id_proyecto: number,
  ) {
    return this.projectsService.remove(id_usuario, id_proyecto);
  }
}