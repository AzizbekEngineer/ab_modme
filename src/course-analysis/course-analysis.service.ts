import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalysisFile } from './entities/course-analysis.entity';
import { CreateAnalysisFileDto, UpdateAnalysisFileDto, UpdateAllAnalysisFileDto, AddAnswerDto } from './dto/create-course-analysis.dto';
import { Company } from './entities/course-analysis.company.entity';

const STATIC_DATA = {
  data: [
    {
      companyId: 1,
      company: 'Kompaniya 1',
      questions: [
        { question: 'Dars rejasi ishlab chiqilganmi?', answers: [] },
        { question: 'Fan uchun to‘liq tarqatma material ishlab chiqilganmi?', answers: [] },
        { question: 'Har bir bo‘g‘ich uchun tarqatma material ishlab chiqilganmi?', answers: [] },
        { question: 'Har bir dars uchun tarqatma material ishlab chiqilganmi?', answers: [] },
      ],
    },
    {
      companyId: 2,
      company: 'Kompaniya 2',
      questions: [
        { question: 'Dars rejasi ishlab chiqilganmi?', answers: [] },
        { question: 'Fan uchun to‘liq tarqatma material ishlab chiqilganmi?', answers: [] },
        { question: 'Har bir bo‘g‘ich uchun tarqatma material ishlab chiqilganmi?', answers: [] },
        { question: 'Har bir dars uchun tarqatma material ishlab chiqilganmi?', answers: [] },
      ],
    },
  ],
};

@Injectable()
export class AnalysisFileService {
  constructor(
    @InjectRepository(AnalysisFile)
    private analysisFileRepository: Repository<AnalysisFile>,
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async create(createAnalysisFileDto: CreateAnalysisFileDto): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    const fileName = createAnalysisFileDto.fileName || 'Dars Rejalari Tahlili';
    const existingFile = await this.analysisFileRepository.findOne({ where: { fileName } });
    if (existingFile) {
      throw new ConflictException('Bu nomdagi fayl allaqachon mavjud');
    }
    const file = this.analysisFileRepository.create({
      fileName,
      data: [],
    });
    const savedFile = await this.analysisFileRepository.save(file);

    const companies = [];
    for (const companyData of STATIC_DATA.data) {
      const company = this.companyRepository.create({
        name: companyData.company,
        questions: companyData.questions.map(q => ({ question: q.question, answers: [...q.answers] })),
        file: savedFile,
      });
      const savedCompany = await this.companyRepository.save(company);
      companies.push({
        companyId: savedCompany.id,
        company: savedCompany.name,
        questions: savedCompany.questions.map(q => ({ question: q.question, answers: [...q.answers] })),
      });
    }

    const updatedFile = await this.analysisFileRepository.findOne({ where: { id: savedFile.id }, relations: ['companies'] });
    updatedFile.companies.sort((a, b) => a.id - b.id);
    updatedFile.data = companies;
    await this.analysisFileRepository.save(updatedFile);

    return { id: updatedFile.id, fileName: updatedFile.fileName, createdAt: updatedFile.createdAt, updatedAt: updatedFile.updatedAt, data: updatedFile.data };
  }

  async findAll(): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date;}[]> {
    const files = await this.analysisFileRepository.find({ relations: ['companies'], order: { createdAt: 'ASC' } });
    return files.map(file => {
      file.companies.sort((a, b) => a.id - b.id);
      return {
        id: file.id,
        fileName: file.fileName,
        createdAt: file.createdAt,
        updatedAt: file.updatedAt
      };
    });
  }

  async findOne(id: number): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    const file = await this.analysisFileRepository.findOne({ where: { id }, relations: ['companies'] });
    if (!file) {
      throw new NotFoundException(`ID ${id} bilan fayl topilmadi`);
    }
    file.companies.sort((a, b) => a.id - b.id);
    file.data = file.companies.map(c => ({
      companyId: c.id,
      company: c.name || 'Nomsiz kompaniya',
      questions: c.questions.map(q => ({ question: q.question, answers: [...q.answers] })),
    }));
    await this.analysisFileRepository.save(file);
    return { id: file.id, fileName: file.fileName, createdAt: file.createdAt, updatedAt: file.updatedAt, data: file.data };
  }

  async update(id: number, updateAnalysisFileDto: UpdateAnalysisFileDto): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    const file = await this.analysisFileRepository.findOne({ where: { id }, relations: ['companies'] });
    if (!file) {
      throw new NotFoundException(`ID ${id} bilan fayl topilmadi`);
    }
    const newFileName = updateAnalysisFileDto.fileName || file.fileName;
    const existingFile = await this.analysisFileRepository.findOne({ where: { fileName: newFileName } });
    if (existingFile && existingFile.id !== id) {
      throw new ConflictException('Bu nomdagi fayl allaqachon mavjud');
    }
    await this.analysisFileRepository.update(id, { fileName: newFileName });
    file.companies.sort((a, b) => a.id - b.id);
    file.data = file.companies.map(c => ({
      companyId: c.id,
      company: c.name || 'Nomsiz kompaniya',
      questions: c.questions.map(q => ({ question: q.question, answers: [...q.answers] })),
    }));
    const updatedFile = await this.analysisFileRepository.save(file);
    return { id: updatedFile.id, fileName: newFileName, createdAt: updatedFile.createdAt, updatedAt: updatedFile.updatedAt, data: updatedFile.data };
  }

  async updateAll(id: number, updateAllAnalysisFileDto: UpdateAllAnalysisFileDto): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    const file = await this.analysisFileRepository.findOne({ where: { id }, relations: ['companies'] });
    if (!file) {
      throw new NotFoundException(`ID ${id} bilan fayl topilmadi`);
    }

    for (const newCompanyData of updateAllAnalysisFileDto.data) {
      const company = file.companies.find(c => c.id === newCompanyData.companyId);
      if (!company) {
        throw new NotFoundException(`Kompaniya ID ${newCompanyData.companyId} topilmadi`);
      }
      for (const newQuestionData of newCompanyData.questions) {
        const question = company.questions.find(q => q.question === newQuestionData.question);
        if (!question) {
          throw new NotFoundException(`Savol "${newQuestionData.question}" kompaniya ${company.name || 'Nomsiz kompaniya'} uchun topilmadi`);
        }
        if (newQuestionData.answers) {
          question.answers = [...newQuestionData.answers];
        }
      }
      await this.companyRepository.save(company);
    }

    file.companies.sort((a, b) => a.id - b.id);
    file.data = file.companies.map(c => ({
      companyId: c.id,
      company: c.name || 'Nomsiz kompaniya',
      questions: c.questions.map(q => ({ question: q.question, answers: [...q.answers] })),
    }));
    const updatedFile = await this.analysisFileRepository.save(file);
    return { id: updatedFile.id, fileName: updatedFile.fileName, createdAt: updatedFile.createdAt, updatedAt: updatedFile.updatedAt, data: updatedFile.data };
  }

  async addCompany(id: number, name: string): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    const file = await this.analysisFileRepository.findOne({ where: { id }, relations: ['companies'] });
    if (!file) {
      throw new NotFoundException(`ID ${id} bilan fayl topilmadi`);
    }
    const existingCompany = file.companies.find(c => c.name === name);
    if (existingCompany) {
      throw new ConflictException(`Kompaniya ${name} allaqachon mavjud`);
    }
    const firstCompany = file.companies[0];
    const newCompany = this.companyRepository.create({
      name,
      questions: firstCompany ? firstCompany.questions.map(q => ({ question: q.question, answers: [] })) : STATIC_DATA.data[0].questions.map(q => ({ question: q.question, answers: [] })),
      file,
    });
    const savedCompany = await this.companyRepository.save(newCompany);
    file.companies = [...file.companies, savedCompany];
    file.companies.sort((a, b) => a.id - b.id);
    file.data = file.companies.map(c => ({
      companyId: c.id,
      company: c.name || 'Nomsiz kompaniya',
      questions: c.questions.map(q => ({ question: q.question, answers: [...q.answers] })),
    }));
    const updatedFile = await this.analysisFileRepository.save(file);
    return { id: updatedFile.id, fileName: updatedFile.fileName, createdAt: updatedFile.createdAt, updatedAt: updatedFile.updatedAt, data: updatedFile.data };
  }

  async addQuestion(id: number, question: string): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    const file = await this.analysisFileRepository.findOne({ where: { id }, relations: ['companies'] });
    if (!file) {
      throw new NotFoundException(`ID ${id} bilan fayl topilmadi`);
    }
    for (const company of file.companies) {
      company.questions = [...company.questions, { question, answers: [] }];
      await this.companyRepository.save(company);
    }
    file.companies.sort((a, b) => a.id - b.id);
    file.data = file.companies.map(c => ({
      companyId: c.id,
      company: c.name || 'Nomsiz kompaniya',
      questions: c.questions.map(q => ({ question: q.question, answers: [...q.answers] })),
    }));
    const updatedFile = await this.analysisFileRepository.save(file);
    return { id: updatedFile.id, fileName: updatedFile.fileName, createdAt: updatedFile.createdAt, updatedAt: updatedFile.updatedAt, data: updatedFile.data };
  }

  async addAnswer(id: number, addAnswerDto: AddAnswerDto): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    const file = await this.analysisFileRepository.findOne({ where: { id }, relations: ['companies'] });
    if (!file) {
      throw new NotFoundException(`ID ${id} bilan fayl topilmadi`);
    }
    const company = file.companies.find(c => c.name === addAnswerDto.company);
    if (!company) {
      throw new NotFoundException(`Kompaniya ${addAnswerDto.company} topilmadi`);
    }
    const question = company.questions.find(q => q.question === addAnswerDto.question);
    if (!question) {
      throw new NotFoundException(`Savol ${addAnswerDto.question} topilmadi`);
    }
    question.answers.push(addAnswerDto.answer);
    await this.companyRepository.save(company);
    file.companies.sort((a, b) => a.id - b.id);
    file.data = file.companies.map(c => ({
      companyId: c.id,
      company: c.name || 'Nomsiz kompaniya',
      questions: c.questions.map(q => ({ question: q.question, answers: [...q.answers] })),
    }));
    const updatedFile = await this.analysisFileRepository.save(file);
    return { id: updatedFile.id, fileName: updatedFile.fileName, createdAt: updatedFile.createdAt, updatedAt: updatedFile.updatedAt, data: updatedFile.data };
  }

  async updateFileName(id: number, fileName: string): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    const file = await this.analysisFileRepository.findOne({ where: { id }, relations: ['companies'] });
    if (!file) {
      throw new NotFoundException(`ID ${id} bilan fayl topilmadi`);
    }
    const existingFile = await this.analysisFileRepository.findOne({ where: { fileName } });
    if (existingFile && existingFile.id !== id) {
      throw new ConflictException('Bu nomdagi fayl allaqachon mavjud');
    }
    file.fileName = fileName;
    file.companies.sort((a, b) => a.id - b.id);
    file.data = file.companies.map(c => ({
      companyId: c.id,
      company: c.name || 'Nomsiz kompaniya',
      questions: c.questions.map(q => ({ question: q.question, answers: [...q.answers] })),
    }));
    const updatedFile = await this.analysisFileRepository.save(file);
    return { id: updatedFile.id, fileName: updatedFile.fileName, createdAt: updatedFile.createdAt, updatedAt: updatedFile.updatedAt, data: updatedFile.data };
  }

  async updateCompanyName(id: number, companyId: number, newName: string): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    if (!newName || newName.trim() === '') {
      throw new BadRequestException('Yangi kompaniya nomi bo‘sh bo‘lishi mumkin emas');
    }

    const file = await this.analysisFileRepository.findOne({ where: { id }, relations: ['companies'] });
    if (!file) {
      throw new NotFoundException(`ID ${id} bilan fayl topilmadi`);
    }

    const company = file.companies.find(c => c.id === companyId);
    if (!company) {
      throw new NotFoundException(`ID ${companyId} bilan kompaniya topilmadi`);
    }

    const existingCompany = file.companies.find(c => c.name === newName && c.id !== companyId);
    if (existingCompany) {
      throw new ConflictException(`Bu nomdagi kompaniya (${newName}) allaqachon mavjud`);
    }

    company.name = newName.trim();
    await this.companyRepository.save(company);

    file.companies.sort((a, b) => a.id - b.id);
    file.data = file.companies.map(c => ({
      companyId: c.id,
      company: c.name || 'Nomsiz kompaniya',
      questions: c.questions.map(q => ({ question: q.question, answers: [...q.answers] })),
    }));

    const updatedFile = await this.analysisFileRepository.save(file);
    return { id: updatedFile.id, fileName: updatedFile.fileName, createdAt: updatedFile.createdAt, updatedAt: updatedFile.updatedAt, data: file.data };
  }

  async remove(id: number): Promise<void> {
  const file = await this.analysisFileRepository.findOne({ where: { id }, relations: ['companies'] });
  if (!file) {
    throw new NotFoundException(`ID ${id} bilan fayl topilmadi`);
  }

  if (file.companies && file.companies.length > 0) {
    await this.companyRepository.delete({ file: { id } });
  }
  await this.analysisFileRepository.remove(file);
}
}