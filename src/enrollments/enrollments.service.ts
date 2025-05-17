import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Enrollment } from './entities/enrollment.entity';

@Injectable()
export class EnrollmentService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly repo: Repository<Enrollment>,
  ) {}

  create(dto: CreateEnrollmentDto) {
    const enrollment = this.repo.create(dto);
    return this.repo.save(enrollment);
  }

  findAll() {
    return this.repo.find({
      relations: ['student', 'group'],
    });
  }

  async findOne(id: number) {
    const enrollment = await this.repo.findOne({
      where: { id },
      relations: ['student', 'group', 'attendances', 'payments'],
    });
    if (!enrollment) throw new NotFoundException('Enrollment not found');
    return enrollment;
  }

  async update(id: number, dto: UpdateEnrollmentDto) {
    const enrollment = await this.findOne(id);
    Object.assign(enrollment, dto);
    return this.repo.save(enrollment);
  }

  async remove(id: number) {
    const enrollment = await this.findOne(id);
    return this.repo.remove(enrollment);
  }
}
