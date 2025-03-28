import { User } from '../users/user.entity';

export type JwtPayload = Pick<User, 'id_usuario'> & {
  // Puedes añadir otras propiedades del token si son necesarias
  username?: string;
  email?: string;
};

export type RequestWithUser = Request & { user: JwtPayload };