// src/customer-persona/customer-persona.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CustomerPersonaService } from './customer-persona.service';
import { CreateCustomerPersonaDto, CreateCustomerPersonaPlanDto } from './dto/create-customer-persona.dto';

@Controller('customer-persona')
export class CustomerPersonaController {
  constructor(private readonly customerPersonaService: CustomerPersonaService) {}

  @Post()
  create(@Body() createCustomerPersonaDto: CreateCustomerPersonaDto) {
    return this.customerPersonaService.create(createCustomerPersonaDto);
  }

  @Post(':id/plan')
  addPlan(@Param('id') id: number, @Body() createPlanDto: CreateCustomerPersonaPlanDto) {
    return this.customerPersonaService.addPlan(id, createPlanDto);
  }

  @Get()
  findAll() {
    return this.customerPersonaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.customerPersonaService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCustomerPersonaDto: CreateCustomerPersonaDto) {
    return this.customerPersonaService.update(id, updateCustomerPersonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customerPersonaService.remove(id);
  }
}