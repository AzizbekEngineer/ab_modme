import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BranchStatus } from '../entities/branch.entity';

export class CreateBranchDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  center_id: number;

  @ApiProperty({ example: 'Chilonzor branch' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Tashkent, Chilonzor 3-kvartal' })
  @IsString()
  address: string;

  @ApiProperty({ example: '+998901234567', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 12, required: false })
  @IsOptional()
  @IsNumber()
  manager_id?: number;

  @ApiProperty({ enum: BranchStatus })
  @IsEnum(BranchStatus)
  status: string;
}
