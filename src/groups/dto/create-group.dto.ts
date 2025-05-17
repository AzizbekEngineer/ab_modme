import { IsString, IsEnum, IsDateString, IsNumber } from 'class-validator';
import { GroupStatus } from '../entities/group.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({
    example: 12,
    description: 'ID of the teacher leading the group',
  })
  @IsNumber()
  teacher_id: number;

  @ApiProperty({
    example: 7,
    description: 'ID of the course assigned to the group',
  })
  @IsNumber()
  course_id: number;

  @ApiProperty({
    example: 4,
    description: 'ID of the room where the group is located',
  })
  @IsNumber()
  room_id: number;

  @ApiProperty({ example: 'Frontend-A1', description: 'Name of the group' })
  @IsString()
  name: string;

  @ApiProperty({
    example: '2025-06-01',
    description: 'Group start date (YYYY-MM-DD)',
  })
  @IsDateString()
  start_date: string;

  @ApiProperty({
    example: '2025-09-01',
    description: 'Group end date (YYYY-MM-DD)',
  })
  @IsDateString()
  end_date: string;

  @ApiProperty({
    example: 'Mon-Wed-Fri 10:00–12:00',
    description: 'Group schedule (days and time)',
  })
  @IsString()
  schedule: string;

  @ApiProperty({ enum: GroupStatus, description: 'Status of the group' })
  @IsEnum(GroupStatus)
  status: GroupStatus;
}
