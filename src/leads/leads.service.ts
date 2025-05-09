import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
  ) {}

  async create(createLeadDto: CreateLeadDto) {
    const lead = this.leadRepository.create(createLeadDto);
    return await this.leadRepository.save(lead);
  }

  async findAll() {
    return await this.leadRepository.find();
  }

  async findOne(id: string) {
    const lead = await this.leadRepository.findOne({ where: { id } });
    if (!lead) throw new NotFoundException(`Lead with ID ${id} not found`);
    return lead;
  }

  async update(id: string, updateLeadDto: UpdateLeadDto) {
    const lead = await this.leadRepository.preload({
      id,
      ...updateLeadDto,
    });
    if (!lead) throw new NotFoundException(`Lead with ID ${id} not found`);
    return await this.leadRepository.save(lead);
  }

  async remove(id: string) {
    const lead = await this.findOne(id);
    return await this.leadRepository.remove(lead);
  }
}