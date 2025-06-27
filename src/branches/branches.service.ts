import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const existingPhone = await this.repo.findOne({
      where: { phone: dto.phone },
    });

    if (existingPhone) {
      throw new BadRequestException('This phone number is already in use.');
    }

    const branch = this.repo.create(dto);
    return await this.repo.save(branch);
  }

  async findAll(paginationDto: PaginationDto, branch_id: number) {
    const { page = 1, limit = 20, fromDate, toDate } = paginationDto;
    const skip = (page - 1) * limit;

    const branch = await this.repo.findOne({
      where: { id: branch_id },
    });

    if (!branch) {
      throw new NotFoundException('Branch not found.');
    }

    const centerId = branch.center_id;

    const where: any = {
      center_id: centerId,
    };

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999); // toDate kunining oxiri

      where.created_at = Between(from, to);
    } else if (fromDate) {
      const from = new Date(fromDate);
      where.created_at = MoreThanOrEqual(from);
    } else if (toDate) {
      const to = new Date(toDate);
      to.setHours(23, 59, 59, 999);
      where.created_at = LessThanOrEqual(to);
    }


    const [data, total] = await this.repo.findAndCount({
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

  async findOne(id: number) {
    const branch = await this.repo.findOne({
      where: { id },
      relations: ['center', 'users', 'students', 'rooms', 'courses'],
    });

    if (!branch) {
      throw new NotFoundException('Branch not found.');
    }

    return branch;
  }

  findByCenterId(centerId: number) {
    return this.repo.find({ where: { center_id: centerId } });
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
