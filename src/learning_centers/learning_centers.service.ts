import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CenterStatus, LearningCenter } from './entities/learning_center.entity';
import { CreateLearningCenterDto } from './dto/create-learning_center.dto';
import { UpdateLearningCenterDto } from './dto/update-learning_center.dto';

@Injectable()
export class LearningCenterService {
  constructor(
    @InjectRepository(LearningCenter)
    private readonly repo: Repository<LearningCenter>,
  ) {}

  async create(dto: CreateLearningCenterDto): Promise<LearningCenter> {
    const now = new Date();
    let demo_expiry_date: Date | null = null;

    if (dto.status === CenterStatus.DEMO) {
      demo_expiry_date = new Date(now);
      demo_expiry_date.setDate(now.getDate() + 15);
    }

    const center = this.repo.create({
      ...dto,
      registration_date: now,
      demo_expiry_date,
    });

    return this.repo.save(center);
  }

  findAll() {
    return this.repo.find();
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
