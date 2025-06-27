// src/competitor-analysis/dto/create-competitor-analysis.dto.ts
import { IsString, IsNumber, IsOptional, IsNotEmpty, IsDate, IsBoolean, IsArray } from 'class-validator';

export class CreateCompetitorAnalysisDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsNumber()
  @IsOptional()
  marketShare?: number;

  @IsDate()
  @IsOptional()
  foundedDate?: Date;

  @IsNumber()
  @IsOptional()
  employeeCount?: number;

  @IsNumber()
  @IsOptional()
  regionCount?: number;

  @IsString()
  @IsOptional()
  generalInfo?: string;

  @IsNumber()
  @IsOptional()
  competitionLevel?: number;

  @IsString()
  @IsOptional()
  createdBy?: string;

  @IsDate()
  @IsOptional()
  analysisDate?: Date;
}

export class CreateCompetitorProductsDto {
  @IsString()
  @IsOptional()
  productName?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  uniqueness?: string;
}

export class CreateCompetitorQualityDto {
  @IsString()
  @IsOptional()
  officeLocation?: string;

  @IsString()
  @IsOptional()
  staffBehavior?: string;

  @IsString()
  @IsOptional()
  callCenterQuality?: string;

  @IsString()
  @IsOptional()
  customerCare?: string;

  @IsString()
  @IsOptional()
  productQuality?: string;
}

export class CreateCompetitorAudienceDto {
  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  ageRange?: string;

  @IsString()
  @IsOptional()
  employmentStatus?: string;

  @IsString()
  @IsOptional()
  commonProblems?: string;

  @IsString()
  @IsOptional()
  contentTypes?: string;

  @IsString()
  @IsOptional()
  platformsUsed?: string;
}

export class CreateCompetitorSocialMediaDto {
  @IsString()
  @IsNotEmpty()
  platform: string;

  @IsString()
  @IsOptional()
  url?: string;

  @IsNumber()
  @IsOptional()
  subscribers?: number;

  @IsString()
  @IsOptional()
  frequency?: string;

  @IsString()
  @IsOptional()
  er?: string;
}

export class CreateCompetitorSwotDto {
  @IsString()
  @IsOptional()
  strength?: string;

  @IsString()
  @IsOptional()
  weakness?: string;

  @IsString()
  @IsOptional()
  opportunity?: string;

  @IsString()
  @IsOptional()
  threat?: string;
}

export class CreateCompetitorTrafficSourcesDto {
  @IsBoolean()
  @IsOptional()
  metaAds?: boolean;

  @IsBoolean()
  @IsOptional()
  googleAds?: boolean;

  @IsBoolean()
  @IsOptional()
  yandexAds?: boolean;

  @IsBoolean()
  @IsOptional()
  linkedinAds?: boolean;

  @IsBoolean()
  @IsOptional()
  xAds?: boolean;

  @IsBoolean()
  @IsOptional()
  influencerMarketing?: boolean;

  @IsBoolean()
  @IsOptional()
  seo?: boolean;

  @IsString()
  @IsOptional()
  other?: string;
}

export class CreateCompetitorSoftwareDto {
  @IsString()
  @IsOptional()
  crm?: string;

  @IsString()
  @IsOptional()
  cms?: string;

  @IsString()
  @IsOptional()
  projectManagement?: string;

  @IsString()
  @IsOptional()
  analytics?: string;

  @IsString()
  @IsOptional()
  communicationTool?: string;

  @IsString()
  @IsOptional()
  securityTool?: string;

  @IsString()
  @IsOptional()
  videoProductionTool?: string;

  @IsString()
  @IsOptional()
  telephony?: string;

  @IsString()
  @IsOptional()
  graphicDesignTool?: string;
}