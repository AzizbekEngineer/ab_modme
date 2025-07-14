import { Controller, Post, Body, Get, Param, Put, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { AnalysisFileService } from './course-analysis.service';
import { CreateAnalysisFileDto, UpdateAnalysisFileDto, UpdateAllAnalysisFileDto, AddAnswerDto } from './dto/create-course-analysis.dto';

@Controller('courses-analysis')
export class AnalysisFileController {
  constructor(private readonly analysisFileService: AnalysisFileService) {}

  @Post("create-file")
  async create(@Body() createAnalysisFileDto: CreateAnalysisFileDto): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    try {
      return await this.analysisFileService.create(createAnalysisFileDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Get("files/all")
  async findAll(): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date;}[]> {
    try {
      return await this.analysisFileService.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    try {
      return await this.analysisFileService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateAnalysisFileDto: UpdateAnalysisFileDto): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    try {
      return await this.analysisFileService.update(+id, updateAnalysisFileDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Put('update-all/:id')
  async updateAll(@Param('id') id: string, @Body() updateAllAnalysisFileDto: UpdateAllAnalysisFileDto): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    try {
      return await this.analysisFileService.updateAll(+id, updateAllAnalysisFileDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Post(':id/add-company')
  async addCompany(@Param('id') id: string, @Body('name') name: string): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    try {
      return await this.analysisFileService.addCompany(+id, name);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post(':id/add-question')
  async addQuestion(@Param('id') id: string, @Body('question') question: string): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    try {
      return await this.analysisFileService.addQuestion(+id, question);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post(':id/add-answer')
  async addAnswer(@Param('id') id: string, @Body() addAnswerDto: AddAnswerDto): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    try {
      return await this.analysisFileService.addAnswer(+id, addAnswerDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Put(':id/update-filename')
  async updateFileName(@Param('id') id: string, @Body('fileName') fileName: string): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    try {
      return await this.analysisFileService.updateFileName(+id, fileName);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Put(':id/update-company-name/:companyId')
  async updateCompanyName(@Param('id') id: string, @Param('companyId') companyId: string, @Body('newName') newName: string): Promise<{ id: number; fileName: string; createdAt: Date; updatedAt: Date; data: { companyId: number; company: string; questions: { question: string; answers: string[] }[] }[] }> {
    try {
      return await this.analysisFileService.updateCompanyName(+id, +companyId, newName);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.analysisFileService.remove(+id);
      return { message: 'Fayl muvaffaqiyatli o‘chirildi' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}