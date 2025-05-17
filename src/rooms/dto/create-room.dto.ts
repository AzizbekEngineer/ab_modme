import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsNumber } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ example: 3, description: 'ID of the branch' })
  @IsNumber()
  branch_id: number;
  
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  max_students: number;
}
