import { IsString, IsNumber, IsOptional, IsNotEmpty, IsArray, IsObject, IsEnum } from 'class-validator';

export class CreateMarketAnalysisDto {
  // Asosiy MarketAnalysis uchun bo'sh qoldiriladi, chunki faqat volumes ishlatiladi
}

export enum Currency {
  SOM = 'so\'m',
  USD = 'dollar',
}

export class MarketVolumeDto {
  @IsString()
  @IsNotEmpty()
  analysisType: string; // PAM, TAM, SAM, SOM

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
  tagName: string; // Fayl nomi uchun foydalanilishi mumkin
}

export class CreatePestleAnalysisDto {
  @IsString()
  @IsNotEmpty()
  category: string; // Siyosiy, Iqtisodiy, etc.

  @IsString()
  @IsOptional()
  analysis?: string;

  @IsString()
  @IsOptional()
  impact?: string;
}

export class CreateMarketFileDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsOptional()
  createdAt?: Date;

  @IsOptional()
  lastSavedAt?: Date;
}

export class SaveAllDto {
  @IsArray()
  @IsOptional()
  volumes?: MarketVolumeDto[];

  @IsArray()
  @IsOptional()
  tags?: CreateMarketTagDto[];

  @IsArray()
  @IsOptional()
  pestle?: CreatePestleAnalysisDto[];

  @IsArray()
  @IsOptional()
  files?: CreateMarketFileDto[];
}

export class CreateFullMarketAnalysisDto {
  @IsObject()
  marketAnalysis: CreateMarketAnalysisDto;

  @IsArray()
  @IsOptional()
  volumes?: MarketVolumeDto[];

  @IsArray()
  @IsOptional()
  tags?: CreateMarketTagDto[];

  @IsArray()
  @IsOptional()
  pestle?: CreatePestleAnalysisDto[];

  @IsArray()
  @IsOptional()
  files?: CreateMarketFileDto[];
}