import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerAnalysis } from './entities/customer-analysis.entity';
import { CustomerSection } from './entities/customer-section.entity';
import { CustomerQuestion } from './entities/customer-question.entity';
import { CreateCustomerAnalysisDto, AddSectionDto, AddQuestionDto, AddCompanyDto, UpdateCompanyNameDto } from './dto/create-customer-analysis.dto';

const backendData = {
  fileName: "FileNomi",
  data: [
    {
      company: "Kompaniya 1",
      sections: [
        {
          title: "Xulq-atvor ma'lumot",
          questions: [
            {
              question: "Sotib olishdan avval qayerdan ma'lumot qidirasiz?",
              answer: "",
            },
            {
              question: "Sotib olishingizga nima turtki bo‘ladi?",
              answer: "",
            },
          ],
        },
        {
          title: "Fanlar",
          questions: [
            {
              question: "Qaysi fan yoqadi?",
              answer: "",
            },
            {
              question: "Qaysi fan qiyin?",
              answer: "",
            },
          ],
        },
      ],
    },
    {
      company: "Kompaniya 2",
      sections: [
        {
          title: "Xulq-atvor ma'lumot",
          questions: [
            {
              question: "Sotib olishdan avval qayerdan ma'lumot qidirasiz?",
              answer: "",
            },
            {
              question: "Sotib olishingizga nima turtki bo‘ladi?",
              answer: "",
            },
          ],
        },
        {
          title: "Fanlar",
          questions: [
            {
              question: "Qaysi fan yoqadi?",
              answer: "",
            },
            {
              question: "Qaysi fan qiyin?",
              answer: "",
            },
          ],
        },
      ],
    },
  ],
};

@Injectable()
export class CustomerAnalysisService {
  constructor(
    @InjectRepository(CustomerAnalysis)
    private customerAnalysisRepository: Repository<CustomerAnalysis>,
    @InjectRepository(CustomerSection)
    private customerSectionRepository: Repository<CustomerSection>,
    @InjectRepository(CustomerQuestion)
    private customerQuestionRepository: Repository<CustomerQuestion>,
  ) {}

  async createFile(createCustomerAnalysisDto: CreateCustomerAnalysisDto) {
    const file = this.customerAnalysisRepository.create({
      fileName: createCustomerAnalysisDto.fileName || backendData.fileName,
      createdAt: new Date(),
      lastSavedAt: new Date(),
    });
    const savedFile = await this.customerAnalysisRepository.save(file);

    const sectionEntities = [];
    if (createCustomerAnalysisDto.sections && createCustomerAnalysisDto.sections.length > 0) {
      createCustomerAnalysisDto.sections.forEach(section => {
        sectionEntities.push(this.customerSectionRepository.create({
          title: section.title,
          company: section.company,
          customerAnalysis: savedFile,
        }));
      });
    } else {
      backendData.data.forEach(companyData => {
        companyData.sections.forEach(section => {
          sectionEntities.push(this.customerSectionRepository.create({
            title: section.title,
            company: companyData.company,
            customerAnalysis: savedFile,
          }));
        });
      });
    }
    const savedSections = await this.customerSectionRepository.save(sectionEntities);

    const questionEntities = [];
    let sectionIndex = 0;
    if (createCustomerAnalysisDto.sections && createCustomerAnalysisDto.sections.length > 0) {
      createCustomerAnalysisDto.sections.forEach((section, index) => {
        const sectionEntity = savedSections[index];
        section.questions?.forEach(question => {
          questionEntities.push(this.customerQuestionRepository.create({
            question: question.question,
            answer: question.answer || "",
            customerSection: sectionEntity,
          }));
        });
      });
    } else {
      backendData.data.forEach((companyData, companyIndex) => {
        companyData.sections.forEach((section, index) => {
          const sectionEntity = savedSections[companyIndex * 2 + index];
          section.questions.forEach(question => {
            questionEntities.push(this.customerQuestionRepository.create({
              question: question.question,
              answer: question.answer,
              customerSection: sectionEntity,
            }));
          });
        });
      });
    }
    await this.customerQuestionRepository.save(questionEntities);

    return await this.findOneFile(savedFile.id);
  }

  async updateAll(fileId: number, dto: CreateCustomerAnalysisDto) {
    const file = await this.customerAnalysisRepository.findOne({
      where: { id: fileId },
      relations: ['sections', 'sections.questions'],
    });
    if (!file) throw new NotFoundException('File not found');

    if (dto.fileName) {
      file.fileName = dto.fileName;
    }

    if (dto.sections) {
      for (const sectionDto of dto.sections) {
        const existingSection = file.sections.find(
          s => s.title === sectionDto.title && s.company === sectionDto.company
        );

        if (!existingSection) continue;

        if (sectionDto.questions) {
          for (const questionDto of sectionDto.questions) {
            if (!questionDto.id) continue;

            const existingQuestion = existingSection.questions.find(q => q.id === questionDto.id);
            if (!existingQuestion) continue;

            if (typeof questionDto.answer === 'string') {
              existingQuestion.answer = questionDto.answer;
              await this.customerQuestionRepository.save(existingQuestion);
            }
          }
        }
      }
    }

    file.lastSavedAt = new Date();
    await this.customerAnalysisRepository.save(file);

    return await this.findOneFile(fileId);
  }

  async addSection(fileId: number, dto: AddSectionDto) {
    const file = await this.customerAnalysisRepository.findOne({
      where: { id: fileId },
      relations: ['sections', 'sections.questions'],
    });
    if (!file) throw new NotFoundException('File not found');

    const companies = backendData.data.map(d => d.company);

    for (const company of companies) {
      const alreadyExists = file.sections.find(
        s => s.title === dto.title && s.company === company,
      );
      if (alreadyExists) continue;

      const section = new CustomerSection();
      section.title = dto.title;
      section.company = company;
      section.customerAnalysis = file;

      section.questions = (dto.questions || []).map(q => {
        const question = new CustomerQuestion();
        question.question = q.question;
        question.answer = q.answer || '';
        question.customerSection = section;
        return question;
      });

      file.sections.push(section);
    }

    file.lastSavedAt = new Date();
    await this.customerAnalysisRepository.save(file);

    return await this.findOneFile(fileId);
  }

  async addQuestion(fileId: number, sectionTitle: string, dto: AddQuestionDto) {
    const file = await this.customerAnalysisRepository.findOne({
      where: { id: fileId },
      relations: ['sections', 'sections.questions'],
    });
    if (!file) throw new NotFoundException('File not found');

    const matchedSections = file.sections.filter(s => s.title === sectionTitle);
    if (matchedSections.length === 0) throw new NotFoundException('Section not found');

    for (const section of matchedSections) {
      const question = new CustomerQuestion();
      question.question = dto.question;
      question.answer = dto.answer || '';
      question.customerSection = section;

      section.questions.push(question);
    }

    file.lastSavedAt = new Date();
    await this.customerAnalysisRepository.save(file);

    return await this.findOneFile(fileId);
  }

  async addCompany(fileId: number, dto: AddCompanyDto) {
    const file = await this.customerAnalysisRepository.findOne({
      where: { id: fileId },
      relations: ['sections', 'sections.questions'],
    });
    if (!file) throw new NotFoundException('File not found');

    const newCompany = dto.company;
    const isExist = file.sections.some(section => section.company === newCompany);
    if (isExist) {
      throw new Error(`Kompaniya allaqachon mavjud: ${newCompany}`);
    }

    const uniqueTitles = [...new Set(file.sections.map(s => s.title))];

    for (const title of uniqueTitles) {
      const templateSection = file.sections.find(s => s.title === title);
      if (!templateSection) continue;

      const section = new CustomerSection();
      section.title = title;
      section.company = newCompany;
      section.customerAnalysis = file;

      section.questions = templateSection.questions.map(q => {
        const question = new CustomerQuestion();
        question.question = q.question;
        question.answer = '';
        question.customerSection = section;
        return question;
      });

      file.sections.push(section);
    }

    file.lastSavedAt = new Date();
    await this.customerAnalysisRepository.save(file);

    return await this.findOneFile(fileId);
  }

  async updateFile(fileId: number, dto: CreateCustomerAnalysisDto) {
    const file = await this.customerAnalysisRepository.findOne({ where: { id: fileId } });
    if (!file) throw new NotFoundException('File not found');
    file.fileName = dto.fileName;
    file.lastSavedAt = new Date();
    return await this.customerAnalysisRepository.save(file);
  }

  async findOneFile(id: number) {
    const file = await this.customerAnalysisRepository.findOne({
      where: { id },
      relations: ['sections', 'sections.questions'],
      order: { createdAt: 'ASC' },
    });

    if (!file) {
      throw new NotFoundException('File topilmadi');
    }

    const companies = [...new Set(file.sections.map(s => s.company))];

    return {
      id: file.id,
      fileName: file.fileName,
      createdAt: file.createdAt,
      lastSavedAt: file.lastSavedAt,
      data: companies.map(company => ({
        company,
        sections: file.sections
          .filter(s => s.company === company)
          .map(section => ({
            title: section.title,
            questions: section.questions.map(q => ({
              id: q.id,
              question: q.question,
              answer: q.answer,
            })),
          })),
      })),
    };
  }

  async findAllFiles() {
    return await this.customerAnalysisRepository.find({
      select: ['id', 'fileName', 'createdAt', 'lastSavedAt'],
      order: { createdAt: 'ASC' },
    });
  }

  async updateCompanyName(fileId: number, dto: UpdateCompanyNameDto) {
    const file = await this.customerAnalysisRepository.findOne({
      where: { id: fileId },
      relations: ['sections'],
    });

    if (!file) throw new NotFoundException('File not found');

    const { oldCompany, newCompany } = dto;

    const matchedSections = file.sections.filter(s => s.company === oldCompany);
    if (matchedSections.length === 0) {
      throw new NotFoundException(`Kompaniya topilmadi: ${oldCompany}`);
    }

    for (const section of matchedSections) {
      section.company = newCompany;
    }

    file.lastSavedAt = new Date();
    await this.customerAnalysisRepository.save(file);

    return await this.findOneFile(fileId);
  }

  async removeFile(fileId: number) {
    const file = await this.customerAnalysisRepository.findOne({ where: { id: fileId } });
    if (!file) throw new NotFoundException('File not found');
    return await this.customerAnalysisRepository.remove(file);
  }
}