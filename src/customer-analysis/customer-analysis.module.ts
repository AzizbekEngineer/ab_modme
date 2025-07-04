import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAnalysisController } from './customer-analysis.controller';
import { CustomerAnalysisService } from './customer-analysis.service';
import { CustomerAnalysis } from './entities/customer-analysis.entity';
import { CustomerSection } from './entities/customer-section.entity';
import { CustomerQuestion } from './entities/customer-question.entity';
@Module({
  imports: [TypeOrmModule.forFeature([CustomerAnalysis, CustomerSection, CustomerQuestion])],
  controllers: [CustomerAnalysisController],
  providers: [CustomerAnalysisService],
})
export class CustomerAnalysisModule {}