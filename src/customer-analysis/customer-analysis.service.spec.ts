import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAnalysisService } from './customer-analysis.service';

describe('CustomerAnalysisService', () => {
  let service: CustomerAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerAnalysisService],
    }).compile();

    service = module.get<CustomerAnalysisService>(CustomerAnalysisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
