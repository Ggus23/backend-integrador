// src/users/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { School } from 'src/schools/school.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(School)
        private schoolsRepository: Repository<School>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        let school = await this.schoolsRepository.findOneBy({ UNIDAD_EDU: createUserDto.colegio });

        if (!school) {
            // Crea el colegio si no existe, llenando también los campos obligatorios
            school = this.schoolsRepository.create({
                UNIDAD_EDU: createUserDto.colegio,
                DISTRITO: 'SIN DISTRITO',      // <--- agregar un valor
                ZONA: 'SIN ZONA',               // <--- agregar un valor
                DEPARTAMEN: 'SIN DEPARTAMENTO', // <--- agregar un valor
                DIRECCION: 'SIN DIRECCION'      // <--- agregar un valor
            });
            school = await this.schoolsRepository.save(school);
        }

        const user = this.usersRepository.create({
            ...createUserDto,
            colegio: school,
        });

        return this.usersRepository.save(user);
    }

    async findAll() {
        return this.usersRepository.find();
    }

    async findOne(id_usuario: number) {
        return this.usersRepository.findOne({
            where: { id_usuario },
            select: ['id_usuario', 'nombre', 'email', 'rol', 'recursos', 'participaciones', 'mensajes', 'contrasena'],
        });
    }

    findOneByEmail(email: string) {
        return this.usersRepository.findOneBy({ email });
    }

    findOneByEmailWhithPassword(email: string) {
        return this.usersRepository.findOne({
            where: { email },
            select: ['id_usuario', 'nombre', 'email', 'rol', 'recursos', 'participaciones', 'mensajes', 'contrasena'],
        });
    }

    async update(id: number, nombre: string, email: string, rol: string) {
        try {
          await this.usersRepository.update(id, { nombre, email, rol });
          return this.findOne(id);
        } catch (error) {
          console.error("Error updating user:", error);
          throw error;
        }
      }

    async remove(id: number) {
        return this.usersRepository.delete(id);
    }
}