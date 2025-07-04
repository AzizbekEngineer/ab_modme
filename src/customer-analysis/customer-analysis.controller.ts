import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { CustomerAnalysisService } from './customer-analysis.service';
import { CreateCustomerAnalysisDto, AddSectionDto, AddQuestionDto, AddCompanyDto, UpdateCompanyNameDto } from './dto/create-customer-analysis.dto';

@Controller('customer-analysis')
export class CustomerAnalysisController {
  constructor(private readonly customerAnalysisService: CustomerAnalysisService) {}

  @Post('file')
  createFile(@Body() createCustomerAnalysisDto: CreateCustomerAnalysisDto) {
    return this.customerAnalysisService.createFile(createCustomerAnalysisDto);
  }

  @Put('file/:fileId/update-all')
  updateAll(@Param('fileId') fileId: number, @Body() dto: CreateCustomerAnalysisDto) {
    return this.customerAnalysisService.updateAll(fileId, dto);
  }

  @Post('file/:fileId/section')
  addSection(@Param('fileId') fileId: number, @Body() dto: AddSectionDto) {
    return this.customerAnalysisService.addSection(fileId, dto);
  }

  @Post('file/:fileId/section/:sectionTitle/question')
  addQuestion(@Param('fileId') fileId: number, @Param('sectionTitle') sectionTitle: string, @Body() dto: AddQuestionDto) {
    return this.customerAnalysisService.addQuestion(fileId, sectionTitle, dto);
  }

  @Post('file/:fileId/company')
  addCompany(@Param('fileId') fileId: number, @Body() dto: AddCompanyDto) {
    return this.customerAnalysisService.addCompany(fileId, dto);
  }

  @Put('file/:fileId')
  updateFile(@Param('fileId') fileId: number, @Body() dto: CreateCustomerAnalysisDto) {
    return this.customerAnalysisService.updateFile(fileId, dto);
  }

  @Get('file/:fileId')
  async findOneFile(@Param('fileId') fileId: number) {
    const file = await this.customerAnalysisService.findOneFile(fileId);
    if (!file) throw new NotFoundException('File not found');
    return file;
  }

  @Get('files')
  findAllFiles() {
    return this.customerAnalysisService.findAllFiles();
  }

  @Put('file/:fileId/company/update-name')
 updateCompanyName(
  @Param('fileId') fileId: number,
  @Body() dto: UpdateCompanyNameDto
 ) {
  return this.customerAnalysisService.updateCompanyName(fileId, dto);
}


  @Delete('file/:fileId')
  removeFile(@Param('fileId') fileId: number) {
    return this.customerAnalysisService.removeFile(fileId);
  }
}