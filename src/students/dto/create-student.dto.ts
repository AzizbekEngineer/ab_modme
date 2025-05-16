import {
  IsString,
  IsEnum,
  IsDateString,
  IsPhoneNumber,
  IsInt,
  Min,
} from 'class-validator';
import { Gender } from '../entities/student.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStudentDto {
  @ApiProperty({
    example: 1,
    description: 'Branch ID where the student belongs',
  })
  @IsInt()
  branch_id: number;

  @ApiProperty({
    example: 'Ali Valiyev',
    description: 'Full name of the student',
  })
  @IsString()
  full_name: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Phone number (Uzbekistan format)',
  })
  @IsPhoneNumber('UZ')
  phone_number: string;

  @ApiProperty({
    example: '2005-01-15',
    description: 'Birth date (YYYY-MM-DD)',
  })
  @IsDateString()
  birth_date: string;

  @ApiProperty({ enum: Gender, description: 'Gender of the student' })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({
    example: 150000,
    description: 'Initial budget of the student',
  })
  @IsInt()
  @Min(0)
  budget: number;
}
