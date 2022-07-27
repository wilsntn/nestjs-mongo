import { ObjectId } from 'bson';
export interface UserToken {
  acess_token: string;
  user: { name: string; email: string; id: ObjectId; isActive: boolean };
}
