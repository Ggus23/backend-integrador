import { User } from '../../users/user.entity';

declare global {
  namespace Express {
    interface Request {
      user?: User; // o el tipo que corresponda a tu usuario
    }
  }
}