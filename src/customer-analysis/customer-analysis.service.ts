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
    const existing = await this.psychographicsRepository.findOne({ where: { customer: { id: analysisId } } });
    if (!existing) {
      const psychographics = this.psychographicsRepository.create({ ...createPsychographicsDto, customer: { id: customerAnalysis.id } });
      return await this.psychographicsRepository.save(psychographics);
    }
    return existing;
  }

  async addBehavior(analysisId: number, createBehaviorDto: CreateCustomerBehaviorDto) {
    const customerAnalysis = await this.customerAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!customerAnalysis) throw new NotFoundException('Customer analysis not found');
    const existing = await this.behaviorRepository.findOne({ where: { customer: { id: analysisId } } });
    if (!existing) {
      const behavior = this.behaviorRepository.create({ ...createBehaviorDto, customer: { id: customerAnalysis.id } });
      return await this.behaviorRepository.save(behavior);
    }
    return existing;
  }

  async addFeedback(analysisId: number, createFeedbackDto: CreateCustomerFeedbackDto) {
    const customerAnalysis = await this.customerAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!customerAnalysis) throw new NotFoundException('Customer analysis not found');
    const existing = await this.feedbackRepository.findOne({ where: { customer: { id: analysisId } } });
    if (!existing) {
      const feedback = this.feedbackRepository.create({ ...createFeedbackDto, customer: { id: customerAnalysis.id } });
      return await this.feedbackRepository.save(feedback);
    }
    return existing;
  }

  async addDynamicQuestion(analysisId: number, createDynamicQuestionDto: CreateCustomerDynamicQuestionDto) {
    const customerAnalysis = await this.customerAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!customerAnalysis) throw new NotFoundException('Customer analysis not found');
    const existing = await this.dynamicQuestionRepository.findOne({ where: { customer: { id: analysisId }, question: createDynamicQuestionDto.question } });
    if (!existing) {
      const question = this.dynamicQuestionRepository.create({ ...createDynamicQuestionDto, customer: { id: customerAnalysis.id } });
      return await this.dynamicQuestionRepository.save(question);
    }
    return existing;
  }

  async saveAll(id: number, updateDto: UpdateCustomerAnalysisDto & { psychographics?: CreateCustomerPsychographicsDto; behavior?: CreateCustomerBehaviorDto; feedback?: CreateCustomerFeedbackDto; dynamicQuestions?: CreateCustomerDynamicQuestionDto[] }) {
    const customerAnalysis = await this.customerAnalysisRepository.findOne({ where: { id } });
    if (!customerAnalysis) throw new NotFoundException('Customer analysis not found');

    return await this.customerAnalysisRepository.manager.transaction(async transactionalEntityManager => {
      await transactionalEntityManager.createQueryBuilder()
        .update(CustomerAnalysis)
        .set({
          fileName: updateDto.fileName,
          companyRepresentative: updateDto.companyRepresentative,
          participantName: updateDto.participantName,
          image: updateDto.image,
          age: updateDto.age,
          gender: updateDto.gender,
          maritalStatus: updateDto.maritalStatus,
          educationLevel: updateDto.educationLevel,
          workplace: updateDto.workplace,
          position: updateDto.position,
          annualIncome: updateDto.annualIncome,
          location: updateDto.location,
          numberOfChildren: updateDto.numberOfChildren,
          householdSize: updateDto.householdSize,
          languagesSpoken: updateDto.languagesSpoken
        })
        .where("id = :id", { id })
        .execute();

      if (updateDto.psychographics) {
        const psychographicsData = Array.isArray(updateDto.psychographics) ? updateDto.psychographics : [updateDto.psychographics];
        for (const data of psychographicsData) {
          const existing = await transactionalEntityManager.findOne(CustomerPsychographics, { where: { customer: { id } } });
          if (!existing) {
            await transactionalEntityManager.createQueryBuilder()
              .insert()
              .into(CustomerPsychographics)
              .values({ ...data, customer: { id } })
              .execute();
          }
        }
      }

      if (updateDto.behavior) {
        const behaviorData = Array.isArray(updateDto.behavior) ? updateDto.behavior : [updateDto.behavior];
        for (const data of behaviorData) {
          const existing = await transactionalEntityManager.findOne(CustomerBehavior, { where: { customer: { id } } });
          if (!existing) {
            await transactionalEntityManager.createQueryBuilder()
              .insert()
              .into(CustomerBehavior)
              .values({ ...data, customer: { id } })
              .execute();
          }
        }
      }

      if (updateDto.feedback) {
        const feedbackData = Array.isArray(updateDto.feedback) ? updateDto.feedback : [updateDto.feedback];
        for (const data of feedbackData) {
          const existing = await transactionalEntityManager.findOne(CustomerFeedback, { where: { customer: { id } } });
          if (!existing) {
            await transactionalEntityManager.createQueryBuilder()
              .insert()
              .into(CustomerFeedback)
              .values({ ...data, customer: { id } })
              .execute();
          }
        }
      }

      if (updateDto.dynamicQuestions && Array.isArray(updateDto.dynamicQuestions)) {
        for (const questionDto of updateDto.dynamicQuestions) {
          const existing = await transactionalEntityManager.findOne(CustomerDynamicQuestion, { where: { customer: { id }, question: questionDto.question } });
          if (!existing) {
            await transactionalEntityManager.createQueryBuilder()
              .insert()
              .into(CustomerDynamicQuestion)
              .values({ ...questionDto, customer: { id } })
              .execute();
          }
        }
      }

      return await transactionalEntityManager.findOne(CustomerAnalysis, { where: { id }, relations: ['psychographics', 'behavior', 'feedback', 'dynamicQuestions'] });
    });
  }

  async updateAllInfo(id: number, updateDto: UpdateCustomerAnalysisDto & { psychographics?: CreateCustomerPsychographicsDto; behavior?: CreateCustomerBehaviorDto; feedback?: CreateCustomerFeedbackDto; dynamicQuestions?: CreateCustomerDynamicQuestionDto[] }) {
    const customerAnalysis = await this.customerAnalysisRepository.findOne({ where: { id } });
    if (!customerAnalysis) throw new NotFoundException('Customer analysis not found');

    await this.customerAnalysisRepository.createQueryBuilder()
      .update(CustomerAnalysis)
      .set({
        fileName: updateDto.fileName,
        companyRepresentative: updateDto.companyRepresentative,
        participantName: updateDto.participantName,
        image: updateDto.image,
        age: updateDto.age,
        gender: updateDto.gender,
        maritalStatus: updateDto.maritalStatus,
        educationLevel: updateDto.educationLevel,
        workplace: updateDto.workplace,
        position: updateDto.position,
        annualIncome: updateDto.annualIncome,
        location: updateDto.location,
        numberOfChildren: updateDto.numberOfChildren,
        householdSize: updateDto.householdSize,
        languagesSpoken: updateDto.languagesSpoken
      })
      .where("id = :id", { id })
      .execute();

    if (updateDto.psychographics) {
      const psychographicsData = Array.isArray(updateDto.psychographics) ? updateDto.psychographics : [updateDto.psychographics];
      for (const data of psychographicsData) {
        const existing = await this.psychographicsRepository.findOne({ where: { customer: { id } } });
        if (!existing) {
          await this.psychographicsRepository.createQueryBuilder()
            .insert()
            .into(CustomerPsychographics)
            .values({ ...data, customer: { id } })
            .execute();
        }
      }
    }

    if (updateDto.behavior) {
      const behaviorData = Array.isArray(updateDto.behavior) ? updateDto.behavior : [updateDto.behavior];
      for (const data of behaviorData) {
        const existing = await this.behaviorRepository.findOne({ where: { customer: { id } } });
        if (!existing) {
          await this.behaviorRepository.createQueryBuilder()
            .insert()
            .into(CustomerBehavior)
            .values({ ...data, customer: { id } })
            .execute();
        }
      }
    }

    if (updateDto.feedback) {
      const feedbackData = Array.isArray(updateDto.feedback) ? updateDto.feedback : [updateDto.feedback];
      for (const data of feedbackData) {
        const existing = await this.feedbackRepository.findOne({ where: { customer: { id } } });
        if (!existing) {
          await this.feedbackRepository.createQueryBuilder()
            .insert()
            .into(CustomerFeedback)
            .values({ ...data, customer: { id } })
            .execute();
        }
      }
    }

    if (updateDto.dynamicQuestions && Array.isArray(updateDto.dynamicQuestions)) {
      for (const questionDto of updateDto.dynamicQuestions) {
        const existing = await this.dynamicQuestionRepository.findOne({ where: { customer: { id }, question: questionDto.question } });
        if (!existing) {
          await this.dynamicQuestionRepository.createQueryBuilder()
            .insert()
            .into(CustomerDynamicQuestion)
            .values({ ...questionDto, customer: { id } })
            .execute();
        }
      }
    }

    return await this.customerAnalysisRepository.findOne({ where: { id }, relations: ['psychographics', 'behavior', 'feedback', 'dynamicQuestions'] });
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