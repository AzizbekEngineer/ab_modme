import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt } from 'class-validator';

export class CreateAttendanceDto {
  @ApiProperty()
  @IsInt()
  enrollment_id: number;

  @ApiProperty({ example: '2025-05-16' })
  @IsDateString()
  date: string;

  @ApiProperty({ enum: ['present', 'absent', 'late'] })
  @IsEnum(['present', 'absent', 'late'])
  status: 'present' | 'absent' | 'late';
}
