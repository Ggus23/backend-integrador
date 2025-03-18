/**
 * Servicio de Usuarios
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(nombre: string, email:string ,contrasena_hasheada: string, rol: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(contrasena_hasheada, 10);
    const user = this.usersRepository.create({ nombre, email, contrasena_hasheada: hashedPassword, rol });
    return this.usersRepository.save(user);
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id_usuario: number) {
    return this.usersRepository.findOne({
      where: { id_usuario },
      select: ['id_usuario', 'nombre', 'email', 'rol', 'recursos', 'participaciones', 'mensajes', 'contrasena_hasheada'], // Asegurar que se incluya la contraseña
  });
  }

  async update(id: number, nombre: string, email:string ,contrasena_hasheada: string, rol: string) {
    await this.usersRepository.update(id, { nombre, email, contrasena_hasheada, rol });
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }
}