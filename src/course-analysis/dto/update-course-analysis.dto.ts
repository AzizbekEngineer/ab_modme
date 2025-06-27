import { PartialType } from '@nestjs/swagger';
import { CreateCourseAnalysisDto } from './create-course-analysis.dto';

export class UpdateCourseAnalysisDto extends PartialType(CreateCourseAnalysisDto) {}
