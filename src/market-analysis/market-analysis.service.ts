import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketFile } from './entities/market-file.entity';
import { MarketVolume } from './entities/market-volume.entity';
import { MarketTag } from './entities/market-tag.entity';
import { PestleAnalysis } from './entities/pestle-analysis.entity';
import { CreateMarketFileDto, MarketVolumeDto, CreateMarketTagDto, CreatePestleAnalysisDto, UpdateAllDto, UpdateMarketFileDto } from './dto/create-market-analysis.dto';

@Injectable()
export class MarketAnalysisService {
  constructor(
    @InjectRepository(MarketFile)
    private marketFileRepository: Repository<MarketFile>,
    @InjectRepository(MarketVolume)
    private marketVolumeRepository: Repository<MarketVolume>,
    @InjectRepository(MarketTag)
    private marketTagRepository: Repository<MarketTag>,
    @InjectRepository(PestleAnalysis)
    private pestleAnalysisRepository: Repository<PestleAnalysis>,
  ) {}

  async createFile(createMarketFileDto: CreateMarketFileDto) {
    const file = this.marketFileRepository.create({
      ...createMarketFileDto,
      volumes: [],
      tags: [],
      pestleAnalyses: []
    });
    return await this.marketFileRepository.save(file);
  }
  \
async updateAll(fileId: number, dto: UpdateAllDto) {
  const file = await this.marketFileRepository.findOne({
    where: { id: fileId },
    relations: ['volumes', 'tags', 'pestleAnalyses'],
  });
  if (!file) throw new NotFoundException('File not found');

  if (dto.fileName) {
    file.fileName = dto.fileName;
    await this.marketFileRepository.save(file);
  }

  if (dto.volumes) {
    await this.marketVolumeRepository.delete({ marketFile: { id: fileId } });

    const newVolumes = dto.volumes.map((v) =>
      this.marketVolumeRepository.create({ ...v, marketFile: file }),
    );
    await this.marketVolumeRepository.save(newVolumes);
  }

  if (dto.tags) {
    await this.marketTagRepository.delete({ marketFile: { id: fileId } });

    const newTags = dto.tags.map((t) =>
      this.marketTagRepository.create({ ...t, marketFile: file }),
    );
    await this.marketTagRepository.save(newTags);
  }

  if (dto.pestle) {
    await this.pestleAnalysisRepository.delete({ marketFile: { id: fileId } });

    const newPestle = dto.pestle.map((p) =>
      this.pestleAnalysisRepository.create({ ...p, marketFile: file }),
    );
    await this.pestleAnalysisRepository.save(newPestle);
  }

  return await this.findOneFile(fileId);
}


  async findAllFiles() {
    return await this.marketFileRepository.find({
      select: ['id', 'fileName', 'createdAt', 'lastSavedAt'],
    });
  }

  async findOneFile(fileId: number) {
    const file = await this.marketFileRepository.findOne({
      where: { id: fileId },
      relations: ['volumes', 'tags', 'pestleAnalyses'],
      select: {
        id: true,
        fileName: true,
        createdAt: true,
        lastSavedAt: true,
        volumes: {
          id: true,
          analysisType: true,
          value: true,
          percentage: true,
          description: true,
          currency: true,
        },
        tags: {
          id: true,
          tagName: true,
        },
        pestleAnalyses: {
          id: true,
          category: true,
          analysis: true,
          impact: true,
        },
      },
    });
    if (!file) throw new NotFoundException('File not found');
    return file;
  }

  async updateFile(fileId: number, updateMarketFileDto: UpdateMarketFileDto) {
    const file = await this.marketFileRepository.findOne({ where: { id: fileId } });
    if (!file) throw new NotFoundException('File not found');
    file.fileName = updateMarketFileDto.fileName;
    return await this.marketFileRepository.save(file);
  }

  async removeFile(fileId: number) {
    const file = await this.findOneFile(fileId);
    return await this.marketFileRepository.remove(file);
  }
}