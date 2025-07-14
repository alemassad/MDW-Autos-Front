export interface User {
  _id: string;
  name: string;
  lastname: string;
  birthdate: string;
  email: string;
  password?: string;
  isAdmin: boolean;
  isActive?: boolean;
}
