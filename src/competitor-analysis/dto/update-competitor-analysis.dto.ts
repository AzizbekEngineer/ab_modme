import { PartialType } from '@nestjs/swagger';
import { CreateCompetitorAnalysisDto } from './create-competitor-analysis.dto';

export class UpdateCompetitorAnalysisDto extends PartialType(CreateCompetitorAnalysisDto) {}
