import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

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

  findAll() {
    return this.repo.find();
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
