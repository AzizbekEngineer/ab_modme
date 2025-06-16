import { Type } from 'class-transformer';
import { IsInt, Min, IsOptional } from 'class-validator';
export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  fromDate?: string;

  @IsOptional()
  toDate?: string;
}
