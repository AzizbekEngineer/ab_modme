import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpOwnerDto {
  // Learning Center (asosiy markaz)
  @ApiProperty({
    example: 'IT Academy',
    description: 'Learning center nomi',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  learningCenterName: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Learning center telefon raqami',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  learningCenterPhone: string;

  // Branch (filial)
  @ApiProperty({
    example: 'Chilonzor filial',
    description: 'Filial nomi',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  branchName: string;

  @ApiProperty({
    example: 'Toshkent shahar, Chilonzor tumani, 21-dah',
    description: 'Filial manzili',
  })
  @IsNotEmpty()
  @IsString()
  branchAddress: string;

  @ApiProperty({
    example: '+998909876543',
    description: 'Filial telefon raqami',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  branchPhone: string;

  // User (owner)
  @ApiProperty({
    example: 'Ali Valiyev',
    description: 'Egasining to‘liq ismi',
    minLength: 3,
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  fullName: string;

  @ApiProperty({
    example: 'alivaliyev',
    description: 'Foydalanuvchi nomi (username)',
    minLength: 3,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Parol (kamida 6 ta belgi)',
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: '+998933214567',
    description: 'Egasining telefon raqami',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  userPhone: string;
}
