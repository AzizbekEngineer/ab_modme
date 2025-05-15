import { IsString, IsEnum, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserStatus } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 1,
    description: 'Branch ID that the user belongs to',
  })
  @IsNotEmpty()
  branch_id: number;

  @ApiProperty({ example: 'john_doe', description: 'Unique username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'StrongPass123!',
    description: 'Plain text password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: UserRole, description: 'Role of the user' })
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsString()
  full_name: string;

  @ApiProperty({
    example: '+998901234567',
    description: 'Primary phone number',
  })
  @IsPhoneNumber('UZ')
  phone: string;

  @ApiProperty({ enum: UserStatus, description: 'Status of the user' })
  @IsEnum(UserStatus)
  status: UserStatus;
}
