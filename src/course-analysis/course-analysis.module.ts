import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisFileController } from './course-analysis.controller';
import { AnalysisFileService } from './course-analysis.service';
import { AnalysisFile } from './entities/course-analysis.entity';
import { Company } from './entities/course-analysis.company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnalysisFile, Company])],
  controllers: [AnalysisFileController],
  providers: [AnalysisFileService],
})
export class AnalysisFileModule {}