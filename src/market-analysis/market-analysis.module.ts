import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MarketAnalysisController } from './market-analysis.controller';
import { MarketAnalysisService } from './market-analysis.service';
import { MarketAnalysis } from './entities/market-analysis.entity';
import { MarketTag } from './entities/market-tag.entity';
import { PestleAnalysis } from './entities/pestle-analysis.entity';
import { MarketFile } from './entities/market-file.entity';
import { MarketVolume } from './entities/market-volume.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MarketAnalysis, MarketTag, PestleAnalysis, MarketFile, MarketVolume])],
  controllers: [MarketAnalysisController],
  providers: [MarketAnalysisService],
})
export class MarketAnalysisModule {}