import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './entities/subscription.entity';

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

  findAll() {
    return this.repo.find();
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
