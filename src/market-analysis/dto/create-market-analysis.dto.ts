import { IsString, IsNumber, IsOptional, IsNotEmpty, IsArray, IsEnum } from 'class-validator';

export enum Currency {
  SOM = 'so\'m',
  USD = 'dollar',
}

export class CreateMarketFileDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;
}

export class UpdateMarketFileDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;
}

export class MarketVolumeDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  value: number;

  @IsNumber()
  @IsOptional()
  percentage?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(Currency, { message: 'Valyuta faqat so\'m yoki dollar bo\'lishi mumkin' })
  @IsOptional()
  currency?: Currency;
}

export class CreateMarketTagDto {
  @IsString()
  @IsNotEmpty()
  tagName: string;
}

export class CreatePestleAnalysisDto {
  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  analysis?: string;

  @IsString()
  @IsOptional()
  impact?: string;
}

export class UpdateAllDto {
  @IsString()
  @IsOptional()
  fileName?: string;

  @IsArray()
  @IsOptional()
  volumes?: MarketVolumeDto[];

  @IsArray()
  @IsOptional()
  tags?: CreateMarketTagDto[];

  @IsArray()
  @IsOptional()
  pestle?: CreatePestleAnalysisDto[];
}