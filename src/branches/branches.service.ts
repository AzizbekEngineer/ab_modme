import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Branch } from './entities/branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

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

  findAll() {
    return this.repo.find();
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
