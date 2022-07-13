export interface UserPayload {
  sub: string;
  email: string;
  name: string;
  isAdmin: boolean;
  isActive: boolean;
  iat?: number;
  exp?: number;
}
