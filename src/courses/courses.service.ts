import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const course = this.courseRepository.create(createCourseDto);
    return await this.courseRepository.save(course);
  }

  async findAll() {
    return await this.courseRepository.find({ relations: ['teacher'] });
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({ where: { id }, relations: ['teacher'] });
    if (!course) throw new NotFoundException(`Course with ID ${id} not found`);
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseRepository.preload({
      id,
      ...updateCourseDto,
    });
    if (!course) throw new NotFoundException(`Course with ID ${id} not found`);
    return await this.courseRepository.save(course);
  }

  async remove(id: string) {
    const course = await this.findOne(id);
    return await this.courseRepository.remove(course);
  }
}