import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

interface User {
  id: number;
  name: string;
  email: string;
  password: string; 
  role: 'soldier' | 'commander';
}

@Injectable()
export class AuthService {
  private users: User[] = [];
  private idCounter = 1;

  constructor(private readonly jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    const userExists = this.users.find(u => u.email === dto.email);
    if (userExists) {
      throw new BadRequestException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser: User = {
      id: this.idCounter++,
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
    };

    this.users.push(newUser);

    return {
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = this.users.find(u => u.email === dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      access_token: token,
    };
  }
}
