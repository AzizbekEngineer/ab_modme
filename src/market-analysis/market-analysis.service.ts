import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketFile } from './entities/market-file.entity';
import { MarketVolume } from './entities/market-volume.entity';
import { MarketTag } from './entities/market-tag.entity';
import { PestleAnalysis } from './entities/pestle-analysis.entity';
import { CreateMarketFileDto, MarketVolumeDto, CreateMarketTagDto, CreatePestleAnalysisDto, SaveAllDto, UpdateMarketFileDto } from './dto/create-market-analysis.dto';

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
    const file = this.marketFileRepository.create(createMarketFileDto);
    return await this.marketFileRepository.save(file);
  }

  async addVolumeToFile(fileId: number, marketVolumeDto: MarketVolumeDto) {
    const file = await this.marketFileRepository.findOne({ where: { id: fileId } });
    if (!file) throw new NotFoundException('File not found');
    const existingVolume = await this.marketVolumeRepository.findOne({ where: { analysisType: marketVolumeDto.analysisType, value: marketVolumeDto.value, marketFile: { id: fileId } } });
    if (existingVolume) {
      return existingVolume;
    }
    const volume = this.marketVolumeRepository.create({ ...marketVolumeDto, marketFile: file });
    return await this.marketVolumeRepository.save(volume);
  }

  async addTagToFile(fileId: number, createMarketTagDto: CreateMarketTagDto) {
    const file = await this.marketFileRepository.findOne({ where: { id: fileId } });
    if (!file) throw new NotFoundException('File not found');
    const existingTag = await this.marketTagRepository.findOne({ where: { tagName: createMarketTagDto.tagName, marketFile: { id: fileId } } });
    if (existingTag) {
      return existingTag;
    }
    const tag = this.marketTagRepository.create({ ...createMarketTagDto, marketFile: file });
    return await this.marketTagRepository.save(tag);
  }

  async addPestleToFile(fileId: number, createPestleAnalysisDto: CreatePestleAnalysisDto) {
    const file = await this.marketFileRepository.findOne({ where: { id: fileId } });
    if (!file) throw new NotFoundException('File not found');
    const existingPestle = await this.pestleAnalysisRepository.findOne({ where: { category: createPestleAnalysisDto.category, marketFile: { id: fileId } } });
    if (existingPestle) {
      return existingPestle;
    }
    const pestle = this.pestleAnalysisRepository.create({ ...createPestleAnalysisDto, marketFile: file });
    return await this.pestleAnalysisRepository.save(pestle);
  }

  async saveAllToFile(fileId: number, saveAllDto: SaveAllDto) {
    const file = await this.marketFileRepository.findOne({ where: { id: fileId } });
    if (!file) throw new NotFoundException('File not found');
    if (saveAllDto.volumes && saveAllDto.volumes.length > 0) {
      for (const volume of saveAllDto.volumes) {
        const existingVolume = await this.marketVolumeRepository.findOne({ where: { analysisType: volume.analysisType, value: volume.value, marketFile: { id: fileId } } });
        if (!existingVolume) {
          const newVolume = this.marketVolumeRepository.create({ ...volume, marketFile: file });
          await this.marketVolumeRepository.save(newVolume);
        }
      }
    }
    if (saveAllDto.tags && saveAllDto.tags.length > 0) {
      for (const tag of saveAllDto.tags) {
        const existingTag = await this.marketTagRepository.findOne({ where: { tagName: tag.tagName, marketFile: { id: fileId } } });
        if (!existingTag) {
          const newTag = this.marketTagRepository.create({ ...tag, marketFile: file });
          await this.marketTagRepository.save(newTag);
        }
      }
    }
    if (saveAllDto.pestle && saveAllDto.pestle.length > 0) {
      for (const pestle of saveAllDto.pestle) {
        const existingPestle = await this.pestleAnalysisRepository.findOne({ where: { category: pestle.category, marketFile: { id: fileId } } });
        if (!existingPestle) {
          const newPestle = this.pestleAnalysisRepository.create({ ...pestle, marketFile: file });
          await this.pestleAnalysisRepository.save(newPestle);
        }
      }
    }
    if (saveAllDto.files && saveAllDto.files.length > 0) {
      for (const newFileData of saveAllDto.files) {
        const existingFile = await this.marketFileRepository.findOne({ where: { id: fileId } });
        if (existingFile) {
          existingFile.fileName = newFileData.fileName || existingFile.fileName; // File nomini yangilash
          await this.marketFileRepository.save(existingFile);
        }
      }
    }
    return await this.findOneFile(fileId);
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

  async findAllFiles() {
    return await this.marketFileRepository.find({
      select: {
        id: true,
        fileName: true,
        createdAt: true,
        lastSavedAt: true,
      },
    });
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