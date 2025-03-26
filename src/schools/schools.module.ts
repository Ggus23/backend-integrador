// src/schools/schools.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { School } from './school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([School])],
  controllers: [SchoolsController],
  providers: [SchoolsService],
})
export class SchoolsModule {}
