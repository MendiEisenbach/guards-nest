import { IsEmail, IsNotEmpty, MinLength, IsIn } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsIn(['soldier', 'commander'])
  role: 'soldier' | 'commander';
}
