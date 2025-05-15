import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
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
