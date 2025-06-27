// src/customer-analysis/customer-analysis.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CustomerAnalysisService } from './customer-analysis.service';
import { CreateCustomerAnalysisDto, CreateCustomerPsychographicsDto, CreateCustomerBehaviorDto, CreateCustomerFeedbackDto, CreateCustomerDynamicQuestionDto } from './dto/create-customer-analysis.dto';

@Controller('customer-analysis')
export class CustomerAnalysisController {
  constructor(private readonly customerAnalysisService: CustomerAnalysisService) {}

  @Post()
  create(@Body() createCustomerAnalysisDto: CreateCustomerAnalysisDto) {
    return this.customerAnalysisService.create(createCustomerAnalysisDto);
  }

  @Post(':id/psychographics')
  addPsychographics(@Param('id') id: number, @Body() createPsychographicsDto: CreateCustomerPsychographicsDto) {
    return this.customerAnalysisService.addPsychographics(id, createPsychographicsDto);
  }

  @Post(':id/behavior')
  addBehavior(@Param('id') id: number, @Body() createBehaviorDto: CreateCustomerBehaviorDto) {
    return this.customerAnalysisService.addBehavior(id, createBehaviorDto);
  }

  @Post(':id/feedback')
  addFeedback(@Param('id') id: number, @Body() createFeedbackDto: CreateCustomerFeedbackDto) {
    return this.customerAnalysisService.addFeedback(id, createFeedbackDto);
  }

  @Post(':id/dynamic-question')
  addDynamicQuestion(@Param('id') id: number, @Body() createDynamicQuestionDto: CreateCustomerDynamicQuestionDto) {
    return this.customerAnalysisService.addDynamicQuestion(id, createDynamicQuestionDto);
  }

  @Get()
  findAll() {
    return this.customerAnalysisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.customerAnalysisService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCustomerAnalysisDto: CreateCustomerAnalysisDto) {
    return this.customerAnalysisService.update(id, updateCustomerAnalysisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customerAnalysisService.remove(id);
  }
}