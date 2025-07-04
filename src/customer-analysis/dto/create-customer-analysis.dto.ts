import { IsOptional, IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CustomerQuestionDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id?: number;

  @IsOptional()
  @Type(() => String)
  @IsString()
  question?: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  answer?: string;
}

export class CustomerSectionDto {
  @Type(() => String)
  @IsString()
  title: string;

  @Type(() => String)
  @IsString()
  company: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomerQuestionDto)
  questions?: CustomerQuestionDto[];
}

export class CreateCustomerAnalysisDto {
  @IsOptional()
  @Type(() => String)
  @IsString()
  fileName?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomerSectionDto)
  sections?: CustomerSectionDto[];
}

export class AddSectionDto {
  @IsString()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomerQuestionDto)
  questions?: CustomerQuestionDto[];
}


export class AddQuestionDto {
  @Type(() => String)
  @IsString()
  question: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  answer?: string;
}

export class AddCompanyDto {
  @Type(() => String)
  @IsString()
  company: string;
}

export class UpdateCompanyNameDto {
  oldCompany: string;
  newCompany: string;
}
