// src/course-analysis/course-analysis.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseAnalysis } from './entities/course-analysis.entity';
import { CreateCourseAnalysisDto, CreateCourseAnalysisCriteriaDto } from './dto/create-course-analysis.dto';
import { CourseAnalysisCriteria } from './entities/course-analysis-criteria.entity';

@Injectable()
export class CourseAnalysisService {
  constructor(
    @InjectRepository(CourseAnalysis)
    private courseAnalysisRepository: Repository<CourseAnalysis>,
    @InjectRepository(CourseAnalysisCriteria)
    private criteriaRepository: Repository<CourseAnalysisCriteria>,
  ) {}

  async create(createCourseAnalysisDto: CreateCourseAnalysisDto) {
    const courseAnalysis = this.courseAnalysisRepository.create(createCourseAnalysisDto);
    return await this.courseAnalysisRepository.save(courseAnalysis);
  }

  async addCriteria(analysisId: number, createCriteriaDto: CreateCourseAnalysisCriteriaDto) {
    const courseAnalysis = await this.courseAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!courseAnalysis) throw new NotFoundException('Course analysis not found');
    const criteria = this.criteriaRepository.create({ ...createCriteriaDto, courseAnalysis });
    return await this.criteriaRepository.save(criteria);
  }

  async findAll() {
    return await this.courseAnalysisRepository.find({ relations: ['criteria'] });
  }

  async findOne(id: number) {
    const courseAnalysis = await this.courseAnalysisRepository.findOne({ where: { id }, relations: ['criteria'] });
    if (!courseAnalysis) throw new NotFoundException('Course analysis not found');
    return courseAnalysis;
  }

  async update(id: number, updateCourseAnalysisDto: CreateCourseAnalysisDto) {
    const courseAnalysis = await this.findOne(id);
    Object.assign(courseAnalysis, updateCourseAnalysisDto);
    return await this.courseAnalysisRepository.save(courseAnalysis);
  }

  async remove(id: number) {
    const courseAnalysis = await this.findOne(id);
    return await this.courseAnalysisRepository.remove(courseAnalysis);
  }
}