import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { LoginResponse } from 'src/interface/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async validateUser( nombre: string, contrasena: string) {
        const user = await this.usersService.findOneByEmailWhithPassword(nombre);

        if (user && await bcryptjs.compare(contrasena, user.contrasena)) {
            return user; // Autenticación exitosa, devuelve el usuario
        }

        return null; // Autenticación fallida
    }

    async register({ nombre, email, contrasena, colegio, rol }: RegisterDto) {
        const user = await this.usersService.findOneByEmail(email);

        if (user) {
            throw new BadRequestException('User already exists');
        }

        await this.usersService.create({
            nombre,
            email,
            contrasena: await bcryptjs.hash(contrasena, 10),
            colegio: colegio, // Pasa colegio directamente como string
            rol: rol, // Pasa rol directamente como string
        });

        return {
            email,
            contrasena
        };
    }

    async login(user: User): Promise<LoginResponse>  {
        const payload = { id_usuario:user.id_usuario ,nombre:user.nombre,email: user.email, role: user.rol };

        const token = await this.jwtService.signAsync(payload);
        return {
            id_usuario:user.id_usuario,
            email: user.email,
            nombre: user.nombre,
            rol: user.rol,
            token,
        };
    }

    async profile({ email }: { email: string; rol: string }) {
        return await this.usersService.findOneByEmail(email);
    }
}