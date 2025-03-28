/**
 * Módulo de Proyectos
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './projects.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { UserModule } from 'src/users/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), CategoriesModule, UserModule,
  AuthModule], // Agrega CategoriesModule y UserModule
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}