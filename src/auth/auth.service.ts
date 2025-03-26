import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser(nombre: string, contrasena: string) {
        const user = await this.usersService.findOneByEmailWhithPassword(nombre);

        if (user && await bcryptjs.compare(contrasena, user.contrasena_hasheada)) {
            return user; // Autenticación exitosa, devuelve el usuario
        }

        return null; // Autenticación fallida
    }

    async register({ nombre, email, contrasena_hasheada, rol, colegio }: RegisterDto) {
        const user = await this.usersService.findOneByEmail(email);

        if (user) {
            throw new BadRequestException('User already exists');
        }

        await this.usersService.create({
            nombre,
            email,
            rol,
            contrasena_hasheada: await bcryptjs.hash(contrasena_hasheada, 10),
            colegio: colegio, // Pasa colegio directamente como string
        });

        return {
            nombre,
            email,
        };
    }

    async login(user: User) {
        const payload = { email: user.email, role: user.rol };

        const token = await this.jwtService.signAsync(payload);
        return {
            token,
            email: user.email,
            name: user.nombre,
            role: user.rol,
        };
    }

    async profile({ email }: { email: string; role: string }) {
        return await this.usersService.findOneByEmail(email);
    }
}