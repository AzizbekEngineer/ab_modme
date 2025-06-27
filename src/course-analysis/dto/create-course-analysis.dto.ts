// src/course-analysis/dto/create-course-analysis.dto.ts
import { IsString, IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateCourseAnalysisDto {
  @IsString()
  @IsNotEmpty()
  subjectName: string;

  @IsString()
  @IsOptional()
  companyName?: string;
}

export class CreateCourseAnalysisCriteriaDto {
  @IsBoolean()
  @IsOptional()
  lessonPlanReady?: boolean;

  @IsBoolean()
  @IsOptional()
  generalMaterialReady?: boolean;

  @IsBoolean()
  @IsOptional()
  blockMaterialReady?: boolean;

  @IsBoolean()
  @IsOptional()
  lessonMaterialReady?: boolean;

  @IsBoolean()
  @IsOptional()
  lessonScenarioReady?: boolean;

  @IsBoolean()
  @IsOptional()
  gamesAndActivitiesReady?: boolean;

  @IsBoolean()
  @IsOptional()
  combinationTasksReady?: boolean;

  @IsBoolean()
  @IsOptional()
  motivationSystemExists?: boolean;

  @IsBoolean()
  @IsOptional()
  teachersScoreAbove50?: boolean;
}