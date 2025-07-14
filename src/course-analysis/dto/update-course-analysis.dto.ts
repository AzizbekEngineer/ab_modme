import { PartialType } from '@nestjs/swagger';
import { CreateAnalysisFileDto } from './create-course-analysis.dto';

export class UpdateCourseAnalysisDto extends PartialType(CreateAnalysisFileDto) {}
