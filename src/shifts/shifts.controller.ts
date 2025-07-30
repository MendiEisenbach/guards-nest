import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ShiftsService, Shift } from './shifts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

class CreateShiftDto {
  soldierId: number;
  startTime: string;
  endTime: string;
}

@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('soldier', 'commander')
  getShifts(@Req() req): Shift[] {
    console.log(req.user);
    return this.shiftsService.getShiftsForUser(req.user);
  }


@Post()

// @UseGuards(RolesGuard) //testing
@Roles('commander')
createShift(@Body() dto: CreateShiftDto, @Req() req): Shift {
  const { soldierId, startTime, endTime } = dto;
  return this.shiftsService.createShift(
    soldierId,
    new Date(startTime),
    new Date(endTime),
  );
}
}
