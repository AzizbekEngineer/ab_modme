import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CenterStatus, LearningCenter } from './entities/learning_center.entity';
import { CreateLearningCenterDto } from './dto/create-learning_center.dto';
import { UpdateLearningCenterDto } from './dto/update-learning_center.dto';
import { PaginationDto } from '../common/pagination/pagination.dto';

@Injectable()
export class LearningCenterService {
  constructor(
    @InjectRepository(LearningCenter)
    private readonly repo: Repository<LearningCenter>,
  ) {}

  async create(dto: CreateLearningCenterDto): Promise<LearningCenter> {
    const now = new Date();
    let demo_expiry_date: Date | null = null;

    if (dto.subscription_status === CenterStatus.ACTIVE) {
      demo_expiry_date = new Date(now);
      demo_expiry_date.setDate(now.getDate() + 15);
    }

    const center = this.repo.create({
      ...dto,
      demo_expiry_date,
    });

    return this.repo.save(center);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 20, fromDate, toDate } = paginationDto;
    const skip = (page - 1) * limit;

    const where: any = {};

    // Sana bo‘yicha filtering
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

  async findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['subscriptions', 'branches'],
    });
  }

  async update(id: number, dto: UpdateLearningCenterDto) {
    const center = await this.findOne(id);
    const updated = Object.assign(center, dto);
    return this.repo.save(updated);
  }

  async remove(id: number) {
    const center = await this.findOne(id);
    return this.repo.remove(center);
  }
}
