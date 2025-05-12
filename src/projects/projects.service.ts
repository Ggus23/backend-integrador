/**
 * Servicio de Proyectos
 */
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entity';
import { CreateProjectDto } from './dto/create-project';
import { Category } from 'src/categories/category.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createProjectDto: CreateProjectDto & { id_usuario: number }): Promise<Project> {
    // Verificar si ya existe un proyecto con el mismo nombre para el mismo usuario
    const existingProject = await this.projectsRepository.findOne({
      where: {
        nombre: createProjectDto.nombre,
        usuario: { id_usuario: createProjectDto.id_usuario },
      },
    });

    if (existingProject) {
      throw new BadRequestException(
        `Ya existe un proyecto con el nombre "${createProjectDto.nombre}" para este usuario.`,
      );
    }

    const category = await this.categoryRepository.findOne({
      where: { id_categoria: createProjectDto.id_categoria },
    });

    const user = await this.userRepository.findOne({
      where: { id_usuario: createProjectDto.id_usuario },
    });

    if (!category || !user) {
      throw new NotFoundException('Categoría o usuario no encontrado');
    }

    const project = this.projectsRepository.create({
      nombre: createProjectDto.nombre,
      descripcion: createProjectDto.descripcion,
      Obj_aprendizaje: createProjectDto.Obj_aprendizaje,
      categoria: category,
      usuario: user,
    });

    return this.projectsRepository.save(project);
  }

  async findAll() {
    return this.projectsRepository.find();
  }

  async findOne(id_proyecto: number) {
    return this.projectsRepository.findOne({ where: { id_proyecto } });
  }
   async findByUser(id_usuario: number): Promise<Project[]> {
  return this.projectsRepository.find({
    where: { usuario: { id_usuario } },
    relations: ['usuario', 'categoria'], // Incluye relaciones necesarias
  });
}

  async update(id_proyecto: number, nombre: string, descripcion: string, fecha_creacion: Date) {
    await this.projectsRepository.update(id_proyecto, { nombre, descripcion, fecha_creacion });
    return this.findOne(id_proyecto);
  }

  async remove(id: number) {
    return this.projectsRepository.delete(id);
  }
}