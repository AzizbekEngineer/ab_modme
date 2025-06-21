import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './entities/subscription.entity';
import { PaginationDto } from '../common/pagination/pagination.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private repo: Repository<Subscription>,
  ) {}

  create(dto: CreateSubscriptionDto) {
    const sub = this.repo.create(dto);
    return this.repo.save(sub);
  }

  async findAll(paginationDto: PaginationDto) {
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
    const sub = await this.repo.findOne({
      where: { id },
      relations: ['center'],
    });
    if (!sub) throw new NotFoundException('Subscription not found');
    return sub;
  }

  async update(id: number, dto: UpdateSubscriptionDto) {
    const sub = await this.findOne(id);
    const updated = Object.assign(sub, dto);
    return this.repo.save(updated);
  }

  async remove(id: number) {
    const sub = await this.findOne(id);
    return this.repo.remove(sub);
  }
}
