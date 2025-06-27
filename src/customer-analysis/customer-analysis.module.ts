// src/customer-analysis/customer-analysis.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAnalysisController } from './customer-analysis.controller';
import { CustomerAnalysisService } from './customer-analysis.service';
import { CustomerAnalysis } from './entities/customer-analysis.entity';
import { CustomerPsychographics } from './entities/customer-psychographics.entity';
import { CustomerBehavior } from './entities/customer-behavior.entity';
import { CustomerFeedback } from './entities/customer-feedback.entity';
import { CustomerDynamicQuestion } from './entities/customer-dynamic-question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerAnalysis, CustomerPsychographics, CustomerBehavior, CustomerFeedback, CustomerDynamicQuestion])],
  controllers: [CustomerAnalysisController],
  providers: [CustomerAnalysisService],
})
export class CustomerAnalysisModule {}