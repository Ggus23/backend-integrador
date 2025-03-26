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
        let school = await this.schoolsRepository.findOneBy({ nombre: createUserDto.colegio });

        if (!school) {
            // Crea el colegio si no existe
            school = this.schoolsRepository.create({ nombre: createUserDto.colegio });
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
            select: ['id_usuario', 'nombre', 'email', 'rol', 'recursos', 'participaciones', 'mensajes', 'contrasena_hasheada'],
        });
    }

    findOneByEmail(email: string) {
        return this.usersRepository.findOneBy({ email });
    }

    findOneByEmailWhithPassword(email: string) {
        return this.usersRepository.findOne({
            where: { email },
            select: ['id_usuario', 'nombre', 'email', 'rol', 'recursos', 'participaciones', 'mensajes', 'contrasena_hasheada'],
        });
    }

    async update(id: number, nombre: string, email: string, contrasena_hasheada: string, rol: string) {
        await this.usersRepository.update(id, { nombre, email, contrasena_hasheada, rol });
        return this.findOne(id);
    }

    async remove(id: number) {
        return this.usersRepository.delete(id);
    }
}