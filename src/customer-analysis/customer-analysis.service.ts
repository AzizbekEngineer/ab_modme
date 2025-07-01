import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerAnalysis } from './entities/customer-analysis.entity';
import { CreateCustomerAnalysisDto, UpdateCustomerAnalysisDto, CreateCustomerPsychographicsDto, CreateCustomerBehaviorDto, CreateCustomerFeedbackDto, CreateCustomerDynamicQuestionDto } from './dto/create-customer-analysis.dto';
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

  async updateBasicInfo(id: number, updateCustomerAnalysisDto: UpdateCustomerAnalysisDto) {
    const customerAnalysis = await this.findOne(id);
    Object.assign(customerAnalysis, updateCustomerAnalysisDto);
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

  async saveAll(id: number, updateDto: UpdateCustomerAnalysisDto & { psychographics?: CreateCustomerPsychographicsDto; behavior?: CreateCustomerBehaviorDto; feedback?: CreateCustomerFeedbackDto; dynamicQuestions?: CreateCustomerDynamicQuestionDto[] }) {
    const customerAnalysis = await this.findOne(id);
    if (updateDto) Object.assign(customerAnalysis, updateDto);
    if (updateDto.psychographics) {
      const psychographics = this.psychographicsRepository.create({ ...updateDto.psychographics, customer: customerAnalysis });
      await this.psychographicsRepository.save(psychographics);
    }
    if (updateDto.behavior) {
      const behavior = this.behaviorRepository.create({ ...updateDto.behavior, customer: customerAnalysis });
      await this.behaviorRepository.save(behavior);
    }
    if (updateDto.feedback) {
      const feedback = this.feedbackRepository.create({ ...updateDto.feedback, customer: customerAnalysis });
      await this.feedbackRepository.save(feedback);
    }
    if (updateDto.dynamicQuestions && Array.isArray(updateDto.dynamicQuestions)) {
      for (const questionDto of updateDto.dynamicQuestions) {
        const question = this.dynamicQuestionRepository.create({ ...questionDto, customer: customerAnalysis });
        await this.dynamicQuestionRepository.save(question);
      }
    }
    return await this.customerAnalysisRepository.save(customerAnalysis);
  }

  async updateAllInfo(id: number, updateDto: UpdateCustomerAnalysisDto & { psychographics?: CreateCustomerPsychographicsDto; behavior?: CreateCustomerBehaviorDto; feedback?: CreateCustomerFeedbackDto; dynamicQuestions?: CreateCustomerDynamicQuestionDto[] }) {
    const customerAnalysis = await this.findOne(id);
    Object.assign(customerAnalysis, updateDto);
    console.log('Update DTO:', updateDto);

    if (updateDto.psychographics) {
      const psychographicsData = updateDto.psychographics;
      const psychographicsToSave = Array.isArray(psychographicsData) ? psychographicsData.map(p => this.psychographicsRepository.create({ ...p, customer: customerAnalysis })) : [this.psychographicsRepository.create({ ...psychographicsData, customer: customerAnalysis })];
      console.log('Psychographics to Save:', psychographicsToSave);
      if (Array.isArray(psychographicsToSave) && psychographicsToSave.length > 0) {
        await this.psychographicsRepository.save(psychographicsToSave.flat());
      }
    }
    if (updateDto.behavior) {
      const behaviorData = updateDto.behavior;
      const behaviorToSave = Array.isArray(behaviorData) ? behaviorData.map(b => this.behaviorRepository.create({ ...b, customer: customerAnalysis })) : [this.behaviorRepository.create({ ...behaviorData, customer: customerAnalysis })];
      console.log('Behavior to Save:', behaviorToSave);
      if (Array.isArray(behaviorToSave) && behaviorToSave.length > 0) {
        await this.behaviorRepository.save(behaviorToSave.flat());
      }
    }
    if (updateDto.feedback) {
      const feedbackData = updateDto.feedback;
      const feedbackToSave = Array.isArray(feedbackData) ? feedbackData.map(f => this.feedbackRepository.create({ ...f, customer: customerAnalysis })) : [this.feedbackRepository.create({ ...feedbackData, customer: customerAnalysis })];
      console.log('Feedback to Save:', feedbackToSave);
      if (Array.isArray(feedbackToSave) && feedbackToSave.length > 0) {
        await this.feedbackRepository.save(feedbackToSave.flat());
      }
    }
    if (updateDto.dynamicQuestions && Array.isArray(updateDto.dynamicQuestions)) {
      for (const questionDto of updateDto.dynamicQuestions) {
        const question = this.dynamicQuestionRepository.create({ ...questionDto, customer: customerAnalysis });
        await this.dynamicQuestionRepository.save(question);
      }
    }
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

  async remove(id: number) {
    const customerAnalysis = await this.findOne(id);
    return await this.customerAnalysisRepository.remove(customerAnalysis);
  }
}