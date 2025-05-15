import { IsString, IsNumber, IsEnum, IsInt, Min } from 'class-validator';
import { CourseStatus } from '../entities/course.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateCourseDto {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: 'Branch ID that owns the course' })
  @IsNumber()
  branch_id: number;

  @ApiProperty({
    example: 'Go Backend Bootcamp',
    description: 'Name of the course',
  })
  @IsString()
  name: string;

  @ApiProperty({ example: 250000, description: 'Price of the course in UZS' })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 'Comprehensive backend development with Go and PostgreSQL',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 3, description: 'Course duration in months' })
  @IsInt()
  @Min(1)
  duration_month: number;

  @ApiProperty({
    enum: CourseStatus,
    description: 'Current status of the course',
  })
  @IsEnum(CourseStatus)
  status: CourseStatus;
}
