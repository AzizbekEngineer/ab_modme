import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CenterStatus } from '../entities/learning_center.entity';

export class CreateLearningCenterDto {
  @ApiProperty({ example: 'EduTech Center' })
  @IsString()
  name: string;

  @ApiProperty({ example: '+998901234567' })
  @IsString()
  phone_number: string;

  @ApiProperty({ enum: CenterStatus })
  @IsEnum(CenterStatus)
  status: CenterStatus;
}
