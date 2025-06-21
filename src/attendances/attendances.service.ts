import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';
import { PaginationDto } from '../common/pagination/pagination.dto';

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

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 20, fromDate, toDate } = paginationDto;

    const skip = (page - 1) * limit;

    const where: any = {};

    if (fromDate && toDate) {
      where.date = Between(fromDate, toDate);
    } else if (fromDate) {
      where.date = MoreThanOrEqual(fromDate);
    } else if (toDate) {
      where.date = LessThanOrEqual(toDate);
    }

    const [items, total] = await this.repo.findAndCount({
      where,
      relations: ['enrollment'],
      skip,
      take: limit,
      order: {
        date: 'DESC',
      },
    });

    return {
      data: items,
      total,
      page,
      limit,
    };
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
