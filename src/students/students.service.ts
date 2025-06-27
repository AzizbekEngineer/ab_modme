import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { PaginationDto } from '../common/pagination/pagination.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private repo: Repository<Student>,
  ) {}

  create(dto: CreateStudentDto) {
    const student = this.repo.create(dto);
    return this.repo.save(student);
  }

  async findAll(paginationDto: PaginationDto): Promise<any> {
    const { page = 1, limit = 20, fromDate, toDate } = paginationDto;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (fromDate && toDate) {
      where.created_at = Between(fromDate, toDate);
    } else if (fromDate) {
      where.created_at = MoreThanOrEqual(fromDate);
    } else if (toDate) {
      where.created_at = LessThanOrEqual(toDate);
    }

    const [data, total] = await this.repo.findAndCount({
      where,
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    const student = await this.repo.findOne({
      where: { id },
      relations: ['branch', 'notifications', 'enrollments'],
    });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async update(id: number, dto: UpdateStudentDto) {
    const student = await this.findOne(id);
    return this.repo.save({ ...student, ...dto });
  }

  async remove(id: number) {
    const student = await this.findOne(id);
    await this.repo.remove(student);
  }
}
