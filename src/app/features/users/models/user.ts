export interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

export interface CreateUserDto {
  name: string;
  email: string;
}