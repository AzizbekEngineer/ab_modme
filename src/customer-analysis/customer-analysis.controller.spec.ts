import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAnalysisController } from './customer-analysis.controller';
import { CustomerAnalysisService } from './customer-analysis.service';

describe('CustomerAnalysisController', () => {
  let controller: CustomerAnalysisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerAnalysisController],
      providers: [CustomerAnalysisService],
    }).compile();

    controller = module.get<CustomerAnalysisController>(CustomerAnalysisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
