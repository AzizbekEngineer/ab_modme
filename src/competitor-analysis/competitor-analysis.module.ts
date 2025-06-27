import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitorAnalysisController } from './competitor-analysis.controller';
import { CompetitorAnalysisService } from './competitor-analysis.service';
import { CompetitorAnalysis } from './entities/competitor-analysis.entity';
import { CompetitorProducts } from './entities/competitor-products.entity';
import { CompetitorQuality } from './entities/competitor-quality.entity';
import { CompetitorAudience } from './entities/competitor-audience.entity';
import { CompetitorSocialMedia } from './entities/competitor-social-media.entity';
import { CompetitorSwot } from './entities/competitor-swot.entity';
import { CompetitorTrafficSources } from './entities/competitor-traffic-sources.entity';
import { CompetitorSoftware } from './entities/competitor-software.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompetitorAnalysis, CompetitorProducts, CompetitorQuality, CompetitorAudience, CompetitorSocialMedia, CompetitorSwot, CompetitorTrafficSources, CompetitorSoftware])],
  controllers: [CompetitorAnalysisController],
  providers: [CompetitorAnalysisService],
})
export class CompetitorAnalysisModule {}