// src/schools/schools.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolController } from './schools.controller';
import { SchoolService } from './schools.service';
import { School } from './school.entity';

@Module({
  imports: [TypeOrmModule.forFeature([School])],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolsModule {}
