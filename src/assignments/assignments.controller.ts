import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AssignmentsService, Assignment } from './assignments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

class CreateAssignmentDto {
  shiftId: number;
  soldierId: number;
}

@Controller('assignments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get()
  @Roles('soldier', 'commander')
  getAssignments(@Req() req): Assignment[] {
    return this.assignmentsService.getAssignmentsForUser(req.user);
  }

  @Post()
  @Roles('commander')
  createAssignment(@Body() dto: CreateAssignmentDto): Assignment {
    const { shiftId, soldierId } = dto;
    return this.assignmentsService.createAssignment(shiftId, soldierId);
  }
}
