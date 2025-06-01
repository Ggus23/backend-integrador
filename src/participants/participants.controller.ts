import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ParticipantsService } from './participants.service';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  create(@Body() body: { id_proyecto: number; id_usuario: number; rol: string }) {
    return this.participantsService.create(body.id_proyecto, body.id_usuario, body.rol);
  }

  @Get()
  findAll() {
    return this.participantsService.findAll();
  }

  @Get('user/:id_usuario/project/:id_proyecto')
  findOne(
    @Param('id_usuario') id_usuario: number,
    @Param('id_proyecto') id_proyecto: number,
  ) {
    return this.participantsService.findOne(id_usuario, id_proyecto);
  }
  @Get('/project/:id_proyecto')
  async findAllByProyecto(@Param('id_proyecto', ParseIntPipe) id_proyecto: number)  {
    return this.participantsService.findByProyecto(id_proyecto);
  }

  @Delete(':id_usuario/:id_proyecto')
  remove(
    @Param('id_usuario') id_usuario: number,
    @Param('id_proyecto') id_proyecto: number,
  ) {
    return this.participantsService.remove(id_usuario, id_proyecto);
  }
}