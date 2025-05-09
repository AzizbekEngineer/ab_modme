import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async create(createNotificationDto: CreateNotificationDto) {
    const notification = this.notificationRepository.create(createNotificationDto);
    return await this.notificationRepository.save(notification);
  }

  async findAll() {
    return await this.notificationRepository.find({ relations: ['recipient'] });
  }

  async findOne(id: string) {
    const notification = await this.notificationRepository.findOne({ where: { id }, relations: ['recipient'] });
    if (!notification) throw new NotFoundException(`Notification with ID ${id} not found`);
    return notification;
  }

  async remove(id: string) {
    const notification = await this.findOne(id);
    return await this.notificationRepository.remove(notification);
  }
}