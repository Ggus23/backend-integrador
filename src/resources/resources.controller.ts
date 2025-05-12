/**
 * Controlador de recursos
 */
import { Controller, Post, Body, Get,Put,Param,Delete } from '@nestjs/common';
import { ResourcesService } from './resources.service';
@Controller('Resources')
export class resourcesService {
  constructor(private readonly resourcesServices: ResourcesService) {}

  @Post()
  async create(@Body('tipo_proyecto') tipo_proyecto: string, @Body('description') description: string, @Body('url') url: string ) {
    return this.resourcesServices.create(tipo_proyecto, description);
  }
  @Get()
  async findAll() {
    return this.resourcesServices.findAll();
  }

  @Get(':id_resource')
  async findOne(@Param('id_resource') id_resource: number) {
    return this.resourcesServices.findOne(id_resource);
  }

  @Put(':id_resource')
  async update(@Param('id_resource') id_resource: number, @Body('tipo_proyecto') tipo_proyecto: string, @Body('url') url: string ) {
    return this.resourcesServices.update(id_resource, tipo_proyecto, url);
  }

  @Delete(':id_resource')
  async remove(@Param('id_resource') id_resource: number) {
    return this.resourcesServices.remove(id_resource);
  }
}