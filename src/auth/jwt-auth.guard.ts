import { Injectable, ExecutionContext, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    @Inject()
    private readonly jwtService: JwtService
    
  canActivate(context: ExecutionContext) {
  const req = context.switchToHttp().getRequest();
  
  
  return super.canActivate(context);
}
}
