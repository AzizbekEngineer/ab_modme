import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly repo: Repository<Attendance>,
  ) {}

  create(dto: CreateAttendanceDto) {
    const attendance = this.repo.create(dto);
    return this.repo.save(attendance);
  }

  findAll() {
    return this.repo.find({
      relations: ['enrollment'],
    });
  }

  async findOne(id: number) {
    const attendance = await this.repo.findOne({
      where: { id },
      relations: ['enrollment'],
    });
    if (!attendance) throw new NotFoundException('Attendance not found');
    return attendance;
  }

  async update(id: number, dto: UpdateAttendanceDto) {
    const attendance = await this.findOne(id);
    Object.assign(attendance, dto);
    return this.repo.save(attendance);
  }

  async remove(id: number) {
    const attendance = await this.findOne(id);
    return this.repo.remove(attendance);
  }
}
