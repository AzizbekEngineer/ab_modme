import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>,
  ) {}

  async create(dto: CreateGroupDto): Promise<Group> {
    const group = this.groupRepo.create(dto);
    return this.groupRepo.save(group);
  }

  async findAll(): Promise<Group[]> {
    return this.groupRepo.find();
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupRepo.findOne({
      where: { id },
      relations: ['teacher', 'course', 'room', 'enrollments'],
    });
    if (!group) throw new NotFoundException('Group not found');
    return group;
  }

  async update(id: number, dto: Partial<CreateGroupDto>): Promise<Group> {
    const group = await this.findOne(id);
    return this.groupRepo.save({ ...group, ...dto });
  }

  async remove(id: number): Promise<void> {
    const group = await this.findOne(id);
    await this.groupRepo.remove(group);
  }
}
