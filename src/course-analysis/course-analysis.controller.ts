// src/course-analysis/course-analysis.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CourseAnalysisService } from './course-analysis.service';
import { CreateCourseAnalysisDto, CreateCourseAnalysisCriteriaDto } from './dto/create-course-analysis.dto';

@Controller('course-analysis')
export class CourseAnalysisController {
  constructor(private readonly courseAnalysisService: CourseAnalysisService) {}

  @Post()
  create(@Body() createCourseAnalysisDto: CreateCourseAnalysisDto) {
    return this.courseAnalysisService.create(createCourseAnalysisDto);
  }

  @Post(':id/criteria')
  addCriteria(@Param('id') id: number, @Body() createCriteriaDto: CreateCourseAnalysisCriteriaDto) {
    return this.courseAnalysisService.addCriteria(id, createCriteriaDto);
  }

  @Get()
  findAll() {
    return this.courseAnalysisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.courseAnalysisService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCourseAnalysisDto: CreateCourseAnalysisDto) {
    return this.courseAnalysisService.update(id, updateCourseAnalysisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.courseAnalysisService.remove(id);
  }
}