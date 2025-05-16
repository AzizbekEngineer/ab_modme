import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

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

  async findAll(): Promise<Notification[]> {
    return this.repo.find({ relations: ['student'] });
  }

  async findOne(id: number): Promise<Notification> {
    const n = await this.repo.findOne({
      where: { id },
      relations: ['student'],
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
