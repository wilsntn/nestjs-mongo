import { ObjectId } from 'bson';
export interface UserPayload {
  sub: ObjectId;
  email: string;
  name: string;
  isAdmin: boolean;
  isActive: boolean;
  iat?: number;
  exp?: number;
}
