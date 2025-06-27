// src/customer-persona/customer-persona.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerPersona } from './entities/customer-persona.entity';
import { CreateCustomerPersonaDto, CreateCustomerPersonaPlanDto } from './dto/create-customer-persona.dto';
import { CustomerPersonaPlan } from './entities/customer-persona-plan.entity';

@Injectable()
export class CustomerPersonaService {
  constructor(
    @InjectRepository(CustomerPersona)
    private customerPersonaRepository: Repository<CustomerPersona>,
    @InjectRepository(CustomerPersonaPlan)
    private planRepository: Repository<CustomerPersonaPlan>,
  ) {}

  async create(createCustomerPersonaDto: CreateCustomerPersonaDto) {
    const customerPersona = this.customerPersonaRepository.create(createCustomerPersonaDto);
    return await this.customerPersonaRepository.save(customerPersona);
  }

  async addPlan(personaId: number, createPlanDto: CreateCustomerPersonaPlanDto) {
    const persona = await this.customerPersonaRepository.findOne({ where: { id: personaId } });
    if (!persona) throw new NotFoundException('Customer persona not found');
    const plan = this.planRepository.create({ ...createPlanDto, persona });
    return await this.planRepository.save(plan);
  }

  async findAll() {
    return await this.customerPersonaRepository.find({ relations: ['plans'] });
  }

  async findOne(id: number) {
    const customerPersona = await this.customerPersonaRepository.findOne({ where: { id }, relations: ['plans'] });
    if (!customerPersona) throw new NotFoundException('Customer persona not found');
    return customerPersona;
  }

  async update(id: number, updateCustomerPersonaDto: CreateCustomerPersonaDto) {
    const customerPersona = await this.findOne(id);
    Object.assign(customerPersona, updateCustomerPersonaDto);
    return await this.customerPersonaRepository.save(customerPersona);
  }

  async remove(id: number) {
    const customerPersona = await this.findOne(id);
    return await this.customerPersonaRepository.remove(customerPersona);
  }
}