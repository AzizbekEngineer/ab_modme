import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PaginationDto } from '../common/pagination/pagination.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly repo: Repository<Notification>,
  ) {}

  async create(dto: CreateNotificationDto): Promise<Notification> {
    const notification = this.repo.create(dto);
    return this.repo.save(notification);
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
      relations: ['student'],
      skip,
      take: limit,
      order: {
        id: 'DESC',
      },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<Notification> {
    const n = await this.repo.findOne({
      where: { id },
      relations: ['student', 'student.branch'],
    });
    if (!n) throw new NotFoundException('Notification not found');
    return n;
  }

  async update(id: number, dto: UpdateNotificationDto): Promise<Notification> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
