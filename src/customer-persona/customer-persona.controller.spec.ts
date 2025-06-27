import { Test, TestingModule } from '@nestjs/testing';
import { CustomerPersonaController } from './customer-persona.controller';
import { CustomerPersonaService } from './customer-persona.service';

describe('CustomerPersonaController', () => {
  let controller: CustomerPersonaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerPersonaController],
      providers: [CustomerPersonaService],
    }).compile();

    controller = module.get<CustomerPersonaController>(CustomerPersonaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
