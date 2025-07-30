import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AssignmentsController],
  providers: [JwtService,AssignmentsService],
  exports: [AssignmentsService],
})
export class AssignmentsModule {}
