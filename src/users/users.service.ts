import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string; 
  role: 'soldier' | 'commander';
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  create(userData: Omit<User, 'id'>): User {
    const newUser: User = {
      id: this.idCounter++,
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }
}
