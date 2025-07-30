import { Injectable, ForbiddenException } from '@nestjs/common';

export interface Assignment {
  id: number;
  shiftId: number;
  soldierId: number;
}

@Injectable()
export class AssignmentsService {
  private assignments: Assignment[] = [];
  private idCounter = 1;

  createAssignment(shiftId: number, soldierId: number): Assignment {
    const newAssignment: Assignment = {
      id: this.idCounter++,
      shiftId,
      soldierId,
    };
    this.assignments.push(newAssignment);
    return newAssignment;
  }

  getAssignmentsForUser(user: { id: number; role: string }): Assignment[] {
    if (user.role === 'commander') {
      return this.assignments;
    } else if (user.role === 'soldier') {
      return this.assignments.filter(a => a.soldierId === user.id);
    } else {
      throw new ForbiddenException('Invalid user role');
    }
  }
}
