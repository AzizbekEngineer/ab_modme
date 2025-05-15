import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
  ) {}

  async create(dto: CreateCourseDto): Promise<Course> {
    const course = this.courseRepo.create(dto);
    return this.courseRepo.save(course);
  }

  async findAll(): Promise<Course[]> {
    return this.courseRepo.find();
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.courseRepo.findOneBy({ id });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async update(id: number, dto: Partial<CreateCourseDto>): Promise<Course> {
    const course = await this.findOne(id);
    const updated = Object.assign(course, dto);
    return this.courseRepo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const course = await this.findOne(id);
    await this.courseRepo.remove(course);
  }
}
