import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({ example: 'admin', description: 'Foydalanuvchi nomi' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'securePassword123', description: 'Parol' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
