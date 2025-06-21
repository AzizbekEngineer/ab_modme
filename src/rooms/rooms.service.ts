import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { PaginationDto } from '../common/pagination/pagination.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly repo: Repository<Room>,
  ) {}

  create(dto: CreateRoomDto) {
    const room = this.repo.create(dto);
    return this.repo.save(room);
  }

  async findAll(paginationDto: PaginationDto): Promise<any> {
    const { page = 1, limit = 20, fromDate, toDate } = paginationDto;
    const skip = (page - 1) * limit;

    const where: any = {};

    // created_at bo‘yicha filtering
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
    const room = await this.repo.findOne({
      where: { id },
      relations: ['branch', 'groups'],
    });
    if (!room) throw new NotFoundException('Room not found');
    return room;
  }

  async update(id: number, dto: UpdateRoomDto) {
    const room = await this.findOne(id);
    const updated = Object.assign(room, dto);
    return this.repo.save(updated);
  }

  async remove(id: number) {
    const room = await this.findOne(id);
    return this.repo.remove(room);
  }
}
