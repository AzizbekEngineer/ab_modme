import { Test, TestingModule } from '@nestjs/testing';
import { CustomerPersonaService } from './customer-persona.service';

describe('CustomerPersonaService', () => {
  let service: CustomerPersonaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerPersonaService],
    }).compile();

    service = module.get<CustomerPersonaService>(CustomerPersonaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
