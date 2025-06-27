// src/customer-persona/dto/create-customer-persona.dto.ts
import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCustomerPersonaDto {
  @IsString()
  @IsOptional()
  personaName?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @IsOptional()
  audiencePercentage?: number;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  educationLevel?: string;

  @IsString()
  @IsOptional()
  workExperience?: string;

  @IsString()
  @IsOptional()
  jobTitle?: string;

  @IsNumber()
  @IsOptional()
  annualIncome?: number;

  @IsString()
  @IsOptional()
  maritalStatus?: string;

  @IsNumber()
  @IsOptional()
  numberOfChildren?: number;

  @IsString()
  @IsOptional()
  residence?: string;

  @IsString()
  @IsOptional()
  interests?: string;

  @IsString()
  @IsOptional()
  socialMedia?: string;

  @IsString()
  @IsOptional()
  values?: string;

  @IsString()
  @IsOptional()
  lifeGoals?: string;

  @IsString()
  @IsOptional()
  freeTimeActivities?: string;

  @IsString()
  @IsOptional()
  favoriteBrands?: string;

  @IsString()
  @IsOptional()
  purchaseMotivation?: string;

  @IsString()
  @IsOptional()
  nonPurchaseReasons?: string;

  @IsString()
  @IsOptional()
  painPoints?: string;

  @IsString()
  @IsOptional()
  influenceFactors?: string;
}

export class CreateCustomerPersonaPlanDto {
  @IsString()
  @IsNotEmpty()
  type: string; // Reja, Hujum, Himoya

  @IsString()
  @IsNotEmpty()
  content: string;
}