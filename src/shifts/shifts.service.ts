import { Injectable, ForbiddenException } from '@nestjs/common';

export interface Shift {
  id: number;
  soldierId: number;    
  startTime: Date;
  endTime: Date;
}

@Injectable()
export class ShiftsService {
  private shifts: Shift[] = [];
  private idCounter = 1;

  createShift(soldierId: number, startTime: Date, endTime: Date): Shift {
    const newShift: Shift = {
      id: this.idCounter++,
      soldierId,
      startTime,
      endTime,
    };
    this.shifts.push(newShift);
    return newShift;
  }

  getShiftsForUser(user: { id: number; role: string }): Shift[] {
    if (user.role === 'commander') {
      return this.shifts;
    } else if (user.role === 'soldier') {
      return this.shifts.filter(shift => shift.soldierId === user.id);
    } else {
      throw new ForbiddenException('Invalid user role');
    }
  }
}
