/**
 * Controlador de Intercambio Cultural
 */
import { Controller, Post, Body,Get,Param,Put,Delete } from '@nestjs/common';
import { CulturalExchangeService } from './cultura-exchange.service';
@Controller('cultural-exchange')
export class CulturalExchangeController {
  constructor(private readonly culturalExchangeService: CulturalExchangeService) {}

  @Post()
  async create( @Body('tipo_contenido') tipo_contenido: string, @Body('descripcion') descripcion: string) {
    return this.culturalExchangeService.create(tipo_contenido, descripcion );
  }
  @Get()
  async findAll() {
    return this.culturalExchangeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.culturalExchangeService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body('tipo_contenido') tipo_contenido: string, @Body('descripcion') descripcion: string) {
    return this.culturalExchangeService.update(id, tipo_contenido, descripcion);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.culturalExchangeService.remove(id);
  }
}