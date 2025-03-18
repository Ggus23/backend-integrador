/**
 * Módulo de Recursos Compartidos
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourcesService } from './resources.service';
import { resourcesService } from './resources.controller';
import { Resource } from './resources.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource])],
  controllers: [resourcesService],
  providers: [ResourcesService],
})
export class ResourcesModule {}
