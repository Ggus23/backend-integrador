import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>, // ✅ Ahora userRepository está disponible
    ) {}

    async validateUser(nombre: string, password: string): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: { nombre },
            select: ['id_usuario', 'nombre', 'email', 'rol', 'contrasena_hasheada'], // Asegurar que incluya la contraseña
        });

        if (!user) return null; // Usuario no encontrado

        const isPasswordValid = await bcrypt.compare(password, user.contrasena_hasheada);
        return isPasswordValid ? user : null;
    }

    async login(user: User) {
        return { message: 'Inicio de sesión exitoso', user };
    }
}