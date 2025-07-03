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

  async updateAll(fileId: number, UpdateAllDto: UpdateAllDto) {
    const file = await this.marketFileRepository.findOne({ where: { id: fileId }, relations: ['volumes', 'tags', 'pestleAnalyses'] });
    if (!file) throw new NotFoundException('File not found');

    if (UpdateAllDto.fileName) {
      file.fileName = UpdateAllDto.fileName;
    }
    if (UpdateAllDto.volumes && UpdateAllDto.volumes.length > 0) {
      for (const volume of UpdateAllDto.volumes) {
        const existingVolume = await this.marketVolumeRepository.findOne({ where: { analysisType: volume.analysisType, value: volume.value, marketFile: { id: fileId } } });
        if (!existingVolume) {
          const newVolume = this.marketVolumeRepository.create({ ...volume, marketFile: file });
          await this.marketVolumeRepository.save(newVolume);
        }
      }
    }
    if (UpdateAllDto.tags && UpdateAllDto.tags.length > 0) {
      for (const tag of UpdateAllDto.tags) {
        const existingTag = await this.marketTagRepository.findOne({ where: { tagName: tag.tagName, marketFile: { id: fileId } } });
        if (!existingTag) {
          const newTag = this.marketTagRepository.create({ ...tag, marketFile: file });
          await this.marketTagRepository.save(newTag);
        }
      }
    }
    if (UpdateAllDto.pestle && UpdateAllDto.pestle.length > 0) {
      for (const pestle of UpdateAllDto.pestle) {
        const existingPestle = await this.pestleAnalysisRepository.findOne({ where: { category: pestle.category, marketFile: { id: fileId } } });
        if (!existingPestle) {
          const newPestle = this.pestleAnalysisRepository.create({ ...pestle, marketFile: file });
          await this.pestleAnalysisRepository.save(newPestle);
        }
      }
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