export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  description: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFormInput {
  name: string;
  description: string;
  avatar: string;
}
