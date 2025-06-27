import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { PaginationDto } from '../common/pagination/pagination.dto';

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

  async findAll(paginationDto: PaginationDto): Promise<any> {
    const { page = 1, limit = 20, fromDate, toDate } = paginationDto;
    const skip = (page - 1) * limit;

    const where: any = {};

    // Faqat created_at mavjud bo‘lsa
    if (fromDate && toDate) {
      where.created_at = Between(fromDate, toDate);
    } else if (fromDate) {
      where.created_at = MoreThanOrEqual(fromDate);
    } else if (toDate) {
      where.created_at = LessThanOrEqual(toDate);
    }

    const [data, total] = await this.groupRepo.findAndCount({
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
