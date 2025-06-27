// src/customer-persona/customer-persona.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerPersonaController } from './customer-persona.controller';
import { CustomerPersonaService } from './customer-persona.service';
import { CustomerPersona } from './entities/customer-persona.entity';
import { CustomerPersonaPlan } from './entities/customer-persona-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerPersona, CustomerPersonaPlan])],
  controllers: [CustomerPersonaController],
  providers: [CustomerPersonaService],
})
export class CustomerPersonaModule {}