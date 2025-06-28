import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerAnalysis } from './entities/customer-analysis.entity';
import { CreateCustomerAnalysisDto, CreateCustomerPsychographicsDto, CreateCustomerBehaviorDto, CreateCustomerFeedbackDto, CreateCustomerDynamicQuestionDto } from './dto/create-customer-analysis.dto';
import { CustomerPsychographics } from './entities/customer-psychographics.entity';
import { CustomerBehavior } from './entities/customer-behavior.entity';
import { CustomerFeedback } from './entities/customer-feedback.entity';
import { CustomerDynamicQuestion } from './entities/customer-dynamic-question.entity';

@Injectable()
export class CustomerAnalysisService {
  constructor(
    @InjectRepository(CustomerAnalysis)
    private customerAnalysisRepository: Repository<CustomerAnalysis>,
    @InjectRepository(CustomerPsychographics)
    private psychographicsRepository: Repository<CustomerPsychographics>,
    @InjectRepository(CustomerBehavior)
    private behaviorRepository: Repository<CustomerBehavior>,
    @InjectRepository(CustomerFeedback)
    private feedbackRepository: Repository<CustomerFeedback>,
    @InjectRepository(CustomerDynamicQuestion)
    private dynamicQuestionRepository: Repository<CustomerDynamicQuestion>,
  ) {}

  async create(createCustomerAnalysisDto: CreateCustomerAnalysisDto) {
    const customerAnalysis = this.customerAnalysisRepository.create(createCustomerAnalysisDto);
    return await this.customerAnalysisRepository.save(customerAnalysis);
  }

  async addPsychographics(analysisId: number, createPsychographicsDto: CreateCustomerPsychographicsDto) {
    const customerAnalysis = await this.customerAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!customerAnalysis) throw new NotFoundException('Customer analysis not found');
    const psychographics = this.psychographicsRepository.create({ ...createPsychographicsDto, customer: customerAnalysis });
    return await this.psychographicsRepository.save(psychographics);
  }

  async addBehavior(analysisId: number, createBehaviorDto: CreateCustomerBehaviorDto) {
    const customerAnalysis = await this.customerAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!customerAnalysis) throw new NotFoundException('Customer analysis not found');
    const behavior = this.behaviorRepository.create({ ...createBehaviorDto, customer: customerAnalysis });
    return await this.behaviorRepository.save(behavior);
  }

  async addFeedback(analysisId: number, createFeedbackDto: CreateCustomerFeedbackDto) {
    const customerAnalysis = await this.customerAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!customerAnalysis) throw new NotFoundException('Customer analysis not found');
    const feedback = this.feedbackRepository.create({ ...createFeedbackDto, customer: customerAnalysis });
    return await this.feedbackRepository.save(feedback);
  }

  async addDynamicQuestion(analysisId: number, createDynamicQuestionDto: CreateCustomerDynamicQuestionDto) {
    const customerAnalysis = await this.customerAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!customerAnalysis) throw new NotFoundException('Customer analysis not found');
    const question = this.dynamicQuestionRepository.create({ ...createDynamicQuestionDto, customer: customerAnalysis });
    return await this.dynamicQuestionRepository.save(question);
  }

  async saveAll(id: number, updateDto: CreateCustomerAnalysisDto) {
    const customerAnalysis = await this.findOne(id);
    Object.assign(customerAnalysis, updateDto);
    return await this.customerAnalysisRepository.save(customerAnalysis);
  }

  async findAll() {
    return await this.customerAnalysisRepository.find({ relations: ['psychographics', 'behavior', 'feedback', 'dynamicQuestions'] });
  }

  async findOne(id: number) {
    const customerAnalysis = await this.customerAnalysisRepository.findOne({ where: { id }, relations: ['psychographics', 'behavior', 'feedback', 'dynamicQuestions'] });
    if (!customerAnalysis) throw new NotFoundException('Customer analysis not found');
    return customerAnalysis;
  }

  async update(id: number, updateCustomerAnalysisDto: CreateCustomerAnalysisDto) {
    const customerAnalysis = await this.findOne(id);
    Object.assign(customerAnalysis, updateCustomerAnalysisDto);
    return await this.customerAnalysisRepository.save(customerAnalysis);
  }

  async remove(id: number) {
    const customerAnalysis = await this.findOne(id);
    return await this.customerAnalysisRepository.remove(customerAnalysis);
  }
}