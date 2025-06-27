import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../common/pagination/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const existing = await this.userRepo.findOne({
      where: [{ username: dto.username }, { phone: dto.phone }],
    });
    if (existing)
      throw new ConflictException('Username or phone already exists');

    const hash = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password_hash: hash });
    return this.userRepo.save(user);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 20, fromDate, toDate } = paginationDto;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (fromDate && toDate) {
      where.created_at = Between(fromDate, toDate);
    } else if (fromDate) {
      where.created_at = MoreThanOrEqual(fromDate);
    } else if (toDate) {
      where.created_at = LessThanOrEqual(toDate);
    }

    const [data, total] = await this.userRepo.findAndCount({
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

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['branch', 'groups'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    const updated = Object.assign(user, dto);
    return this.userRepo.save(updated);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepo.remove(user);
  }
}
