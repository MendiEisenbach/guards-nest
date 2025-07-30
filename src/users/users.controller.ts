import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService, User } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('commander')
  getAllUsers(): User[] {
    return this.usersService.findAll();
  }
}
