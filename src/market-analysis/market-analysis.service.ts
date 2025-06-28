import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketAnalysis } from './entities/market-analysis.entity';
import { CreateMarketAnalysisDto, CreateMarketTagDto, CreatePestleAnalysisDto, CreateMarketFileDto, SaveAllDto, CreateFullMarketAnalysisDto, MarketVolumeDto } from './dto/create-market-analysis.dto';
import { MarketTag } from './entities/market-tag.entity';
import { PestleAnalysis } from './entities/pestle-analysis.entity';
import { MarketFile } from './entities/market-file.entity';
import { MarketVolume } from './entities/market-volume.entity';

@Injectable()
export class MarketAnalysisService {
  constructor(
    @InjectRepository(MarketAnalysis)
    private marketAnalysisRepository: Repository<MarketAnalysis>,
    @InjectRepository(MarketTag)
    private marketTagRepository: Repository<MarketTag>,
    @InjectRepository(PestleAnalysis)
    private pestleAnalysisRepository: Repository<PestleAnalysis>,
    @InjectRepository(MarketFile)
    private marketFileRepository: Repository<MarketFile>,
    @InjectRepository(MarketVolume)
    private marketVolumeRepository: Repository<MarketVolume>,
  ) {}

  async create(createMarketAnalysisDto: CreateMarketAnalysisDto) {
    const marketAnalysis = this.marketAnalysisRepository.create(createMarketAnalysisDto);
    return await this.marketAnalysisRepository.save(marketAnalysis);
  }

  async createFile(analysisId: number, createMarketFileDto: CreateMarketFileDto) {
    const marketAnalysis = await this.marketAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!marketAnalysis) throw new NotFoundException('Market analysis not found');
    const existingFile = await this.marketFileRepository.findOne({ where: { fileName: createMarketFileDto.fileName, marketAnalysis: { id: analysisId } } });
    if (existingFile) {
      return existingFile;
    }
    const file = this.marketFileRepository.create({ ...createMarketFileDto, marketAnalysis });
    return await this.marketFileRepository.save(file);
  }

  async createFull(createFullMarketAnalysisDto: CreateFullMarketAnalysisDto) {
    const marketAnalysis = await this.marketAnalysisRepository.save(this.marketAnalysisRepository.create(createFullMarketAnalysisDto.marketAnalysis));
    if (createFullMarketAnalysisDto.volumes && createFullMarketAnalysisDto.volumes.length > 0) {
      const volumes = createFullMarketAnalysisDto.volumes.map(v => this.marketVolumeRepository.create({ ...v, marketAnalysis }));
      await this.marketVolumeRepository.save(volumes);
    }
    if (createFullMarketAnalysisDto.tags && createFullMarketAnalysisDto.tags.length > 0) {
      const tags = createFullMarketAnalysisDto.tags.map(tag => this.marketTagRepository.create({ ...tag, marketAnalysis }));
      await this.marketTagRepository.save(tags);
    }
    if (createFullMarketAnalysisDto.pestle && createFullMarketAnalysisDto.pestle.length > 0) {
      const pestle = createFullMarketAnalysisDto.pestle.map(p => this.pestleAnalysisRepository.create({ ...p, marketAnalysis }));
      await this.pestleAnalysisRepository.save(pestle);
    }
    if (createFullMarketAnalysisDto.files && createFullMarketAnalysisDto.files.length > 0) {
      const files = createFullMarketAnalysisDto.files.map(f => this.marketFileRepository.create({ ...f, marketAnalysis }));
      await this.marketFileRepository.save(files);
    }
    return await this.findOne(marketAnalysis.id);
  }

  async addVolume(analysisId: number, marketVolumeDto: MarketVolumeDto) {
    const marketAnalysis = await this.marketAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!marketAnalysis) throw new NotFoundException('Market analysis not found');
    const existingVolume = await this.marketVolumeRepository.findOne({ where: { analysisType: marketVolumeDto.analysisType, value: marketVolumeDto.value, marketAnalysis: { id: analysisId } } });
    if (existingVolume) {
      return existingVolume;
    }
    const volume = this.marketVolumeRepository.create({ ...marketVolumeDto, marketAnalysis });
    return await this.marketVolumeRepository.save(volume);
  }

  async addTag(analysisId: number, createMarketTagDto: CreateMarketTagDto) {
    const marketAnalysis = await this.marketAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!marketAnalysis) throw new NotFoundException('Market analysis not found');
    const existingTag = await this.marketTagRepository.findOne({ where: { tagName: createMarketTagDto.tagName, marketAnalysis: { id: analysisId } } });
    if (existingTag) {
      return existingTag;
    }
    const tag = this.marketTagRepository.create({ ...createMarketTagDto, marketAnalysis });
    return await this.marketTagRepository.save(tag);
  }

  async addPestleAnalysis(analysisId: number, createPestleAnalysisDto: CreatePestleAnalysisDto) {
    const marketAnalysis = await this.marketAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!marketAnalysis) throw new NotFoundException('Market analysis not found');
    const existingPestle = await this.pestleAnalysisRepository.findOne({ where: { category: createPestleAnalysisDto.category, marketAnalysis: { id: analysisId } } });
    if (existingPestle) {
      return existingPestle;
    }
    const pestle = this.pestleAnalysisRepository.create({ ...createPestleAnalysisDto, marketAnalysis });
    return await this.pestleAnalysisRepository.save(pestle);
  }

  async addMarketFile(analysisId: number, createMarketFileDto: CreateMarketFileDto) {
    const marketAnalysis = await this.marketAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!marketAnalysis) throw new NotFoundException('Market analysis not found');
    const existingFile = await this.marketFileRepository.findOne({ where: { fileName: createMarketFileDto.fileName, marketAnalysis: { id: analysisId } } });
    if (existingFile) {
      return existingFile;
    }
    const file = this.marketFileRepository.create({ ...createMarketFileDto, marketAnalysis });
    return await this.marketFileRepository.save(file);
  }

  async saveAll(analysisId: number, saveAllDto: SaveAllDto) {
    const marketAnalysis = await this.marketAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!marketAnalysis) throw new NotFoundException('Market analysis not found');
    if (saveAllDto.volumes && saveAllDto.volumes.length > 0) {
      for (const volume of saveAllDto.volumes) {
        const existingVolume = await this.marketVolumeRepository.findOne({ where: { analysisType: volume.analysisType, value: volume.value, marketAnalysis: { id: analysisId } } });
        if (!existingVolume) {
          const newVolume = this.marketVolumeRepository.create({ ...volume, marketAnalysis });
          await this.marketVolumeRepository.save(newVolume);
        }
      }
    }
    if (saveAllDto.tags && saveAllDto.tags.length > 0) {
      for (const tag of saveAllDto.tags) {
        const existingTag = await this.marketTagRepository.findOne({ where: { tagName: tag.tagName, marketAnalysis: { id: analysisId } } });
        if (!existingTag) {
          const newTag = this.marketTagRepository.create({ ...tag, marketAnalysis });
          await this.marketTagRepository.save(newTag);
        }
      }
    }
    if (saveAllDto.pestle && saveAllDto.pestle.length > 0) {
      for (const pestle of saveAllDto.pestle) {
        const existingPestle = await this.pestleAnalysisRepository.findOne({ where: { category: pestle.category, marketAnalysis: { id: analysisId } } });
        if (!existingPestle) {
          const newPestle = this.pestleAnalysisRepository.create({ ...pestle, marketAnalysis });
          await this.pestleAnalysisRepository.save(newPestle);
        }
      }
    }
    if (saveAllDto.files && saveAllDto.files.length > 0) {
      for (const file of saveAllDto.files) {
        const existingFile = await this.marketFileRepository.findOne({ where: { fileName: file.fileName, marketAnalysis: { id: analysisId } } });
        if (!existingFile) {
          const newFile = this.marketFileRepository.create({ ...file, marketAnalysis });
          await this.marketFileRepository.save(newFile);
        }
      }
    }
    return await this.findOne(analysisId);
  }

  async findAll() {
    return await this.marketAnalysisRepository.find({
      relations: ['volumes', 'tags', 'pestleAnalyses', 'files'],
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
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
        files: {
          id: true,
          fileName: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const marketAnalysis = await this.marketAnalysisRepository.findOne({
      where: { id },
      relations: ['volumes', 'tags', 'pestleAnalyses', 'files'],
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
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
        files: {
          id: true,
          fileName: true,
        },
      },
    });
    if (!marketAnalysis) throw new NotFoundException('Market analysis not found');
    return marketAnalysis;
  }

  async update(id: number, updateMarketAnalysisDto: CreateMarketAnalysisDto) {
    const marketAnalysis = await this.findOne(id);
    Object.assign(marketAnalysis, updateMarketAnalysisDto);
    return await this.marketAnalysisRepository.save(marketAnalysis);
  }

  async remove(id: number) {
    const marketAnalysis = await this.findOne(id);
    return await this.marketAnalysisRepository.remove(marketAnalysis);
  }
}