import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt } from 'class-validator';

export class CreateEnrollmentDto {
  @ApiProperty()
  @IsInt()
  student_id: number;

  @ApiProperty()
  @IsInt()
  group_id: number;

  @ApiProperty({ example: '2025-05-16' })
  @IsDateString()
  enrollment_date: string;

  @ApiProperty({ enum: ['active', 'inactive', 'finished'], default: 'active' })
  @IsEnum(['active', 'inactive', 'finished'])
  status: 'active' | 'inactive' | 'finished';
}
