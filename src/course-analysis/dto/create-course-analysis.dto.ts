import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional, ArrayMaxSize, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

class QuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsArray()
  @IsOptional()
  answers: string[];
}

class CompanyDto {
  @IsInt()
  @IsNotEmpty()
  companyId: number;

  @IsString()
  @IsOptional()
  company?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionDto)
  questions: QuestionDto[];
}

export class CreateAnalysisFileDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fileName?: string;
}

export class UpdateAnalysisFileDto extends CreateAnalysisFileDto {}

export class UpdateAllAnalysisFileDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CompanyDto)
  data: { companyId: number; company?: string; questions: { question: string; answers: string[] }[] }[];
}

export class AddAnswerDto {
  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}