import { ObjectId } from 'bson';
export interface UserFromJwt {
  id: ObjectId;
  email: string;
  name: string;
}
