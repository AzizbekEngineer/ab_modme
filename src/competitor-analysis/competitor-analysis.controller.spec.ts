import { Test, TestingModule } from '@nestjs/testing';
import { CompetitorAnalysisController } from './competitor-analysis.controller';
import { CompetitorAnalysisService } from './competitor-analysis.service';

describe('CompetitorAnalysisController', () => {
  let controller: CompetitorAnalysisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetitorAnalysisController],
      providers: [CompetitorAnalysisService],
    }).compile();

    controller = module.get<CompetitorAnalysisController>(CompetitorAnalysisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
