import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseAnalysisController } from './course-analysis.controller';
import { CourseAnalysisService } from './course-analysis.service';
import { CourseAnalysis } from './entities/course-analysis.entity';
import { CourseAnalysisCriteria } from './entities/course-analysis-criteria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CourseAnalysis, CourseAnalysisCriteria])],
  controllers: [CourseAnalysisController],
  providers: [CourseAnalysisService],
})
export class CourseAnalysisModule {}