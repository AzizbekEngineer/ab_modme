import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    const group = this.groupRepository.create(createGroupDto);
    return await this.groupRepository.save(group);
  }

  async findAll() {
    return await this.groupRepository.find({ relations: ['teacher', 'course', 'students'] });
  }

  async findOne(id: string) {
    const group = await this.groupRepository.findOne({ where: { id }, relations: ['teacher', 'course', 'students'] });
    if (!group) throw new NotFoundException(`Group with ID ${id} not found`);
    return group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupRepository.preload({
      id,
      ...updateGroupDto,
    });
    if (!group) throw new NotFoundException(`Group with ID ${id} not found`);
    return await this.groupRepository.save(group);
  }

  async remove(id: string) {
    const group = await this.findOne(id);
    return await this.groupRepository.remove(group);
  }
}