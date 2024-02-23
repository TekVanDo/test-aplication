import { User } from '../../modules/queries/entities/user';

export interface RequestWithUser extends Request {
  user: User;
}
