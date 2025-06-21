import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PaginationDto } from '../common/pagination/pagination.dto';

@Injectable()
export class BranchService {
  constructor(
    @InjectRepository(Branch)
    private readonly repo: Repository<Branch>,
  ) {}

  async create(dto: CreateBranchDto) {
    const existing_phone = await this.repo.findOne({
      where: { phone: dto.phone },
    });

    if (existing_phone) {
      throw new BadRequestException('Ushbu telefon raqam allaqachon mavjud.');
    }

    const branch = this.repo.create(dto);
    return await this.repo.save(branch);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page = 1, limit = 20, fromDate, toDate } = paginationDto;
    const skip = (page - 1) * limit;

    const where: any = {};

    // Agar branch jadvalida created_at bo‘lsa:
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
      order: {
        id: 'DESC', // yoki name: 'ASC' kabi
      },
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['center', 'users', 'students', 'rooms', 'courses'],
    });
  }

  findByCenterId(id: number) {
    return this.repo.find({ where: { center_id: id } });
  }

  async update(id: number, dto: UpdateBranchDto) {
    const branch = await this.findOne(id);
    const updated = Object.assign(branch, dto);
    return this.repo.save(updated);
  }

  async remove(id: number) {
    const branch = await this.findOne(id);
    return this.repo.remove(branch);
  }
}
