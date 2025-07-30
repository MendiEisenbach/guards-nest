import { Module } from '@nestjs/common';
import { ShiftsService } from './shifts.service';
import { ShiftsController } from './shifts.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ShiftsController],
  providers: [ShiftsService,JwtService],
  exports: [ShiftsService],
})
export class ShiftsModule {}
