import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MarketFile } from './entities/market-file.entity';
import { MarketVolume } from './entities/market-volume.entity';
import { MarketTag } from './entities/market-tag.entity';
import { PestleAnalysis } from './entities/pestle-analysis.entity';
import { CreateMarketFileDto, MarketVolumeDto, CreateMarketTagDto, CreatePestleAnalysisDto, UpdateAllDto, UpdateMarketFileDto } from './dto/create-market-analysis.dto';

const dataMarketing = {
  fileName: "Yangi file",
  createdAt: new Date(),
  lastSavedAt: new Date(),
  volumes: [
    {
      category: "Potensional bozor hajmi",
      description: "siz maxsulot/xizmatlaringizni sotish uchun potensional bozor hajmi",
      percentage: 0,
      value: 0,
      currency: "",
    },
    {
      category: "Umumiy bozor hajmi",
      description: "siz maxsulot/xizmatlaringizni sotish uchun umumiy bozor",
      percentage: 0,
      value: 0,
      currency: "",
    },
    {
      category: "Xizmat ko'rsatish mavjud bo'lgan bozor hajmi",
      description: "Sizning geografik joylashuvingizda mavjud bozor hajmi",
      percentage: 0,
      value: 0,
      currency: "",
    },
    {
      category: "Siz olishingiz mumkin bo'lgan bozor hajmi",
      description: "",
      percentage: 0,
      value: 0,
      currency: "",
    },
  ],
  pestleAnalyses: [
    {
      category: "Siyosiy (Political)",
      analysis: "",
      impact: "",
    },
    {
      category: "Iqtisodiy (Economic)",
      analysis: "",
      impact: "",
    },
    {
      category: "Ijtimoiy (Social)",
      analysis: "",
      impact: "",
    },
    {
      category: "Texnologik (Technological)",
      analysis: "",
      impact: "",
    },
    {
      category: "Qonuniy (Legal)",
      analysis: "",
      impact: "",
    },
    {
      category: "Ekologik (Ecological)",
      analysis: "",
      impact: "",
    },
  ],
};

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
    const queryRunner = this.marketFileRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const file = this.marketFileRepository.create({
        ...createMarketFileDto,
        createdAt: dataMarketing.createdAt,
        lastSavedAt: dataMarketing.lastSavedAt,
      });
      const savedFile = await queryRunner.manager.save(MarketFile, file);
      const volumes = dataMarketing.volumes.map((v) =>
        this.marketVolumeRepository.create({
          category: v.category,
          value: v.value,
          percentage: v.percentage,
          description: v.description,
          currency: v.currency,
          marketFile: savedFile,
        })
      );
      await queryRunner.manager.save(MarketVolume, volumes);

      const pestleAnalyses = dataMarketing.pestleAnalyses.map((p) =>
        this.pestleAnalysisRepository.create({
          category: p.category,
          analysis: p.analysis,
          impact: p.impact,
          marketFile: savedFile,
        })
      );
      await queryRunner.manager.save(PestleAnalysis, pestleAnalyses);

      await queryRunner.commitTransaction();

      return await this.findOneFile(savedFile.id);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  async updateAll(fileId: number, dto: UpdateAllDto) {
    const file = await this.marketFileRepository.findOne({
      where: { id: fileId },
      relations: ['volumes', 'tags', 'pestleAnalyses'],
    });
    if (!file) throw new NotFoundException('File not found');

    if (dto.fileName) {
      file.fileName = dto.fileName;
      file.lastSavedAt = new Date();
      await this.marketFileRepository.save(file);
    }

    if (dto.volumes) {
      for (const volume of dto.volumes) {
        const existingVolume = await this.marketVolumeRepository.findOne({
          where: { category: volume.category, marketFile: { id: fileId } },
        });
        if (existingVolume) {
          Object.assign(existingVolume, volume);
          await this.marketVolumeRepository.save(existingVolume);
        } else {
          const newVolume = this.marketVolumeRepository.create({ ...volume, marketFile: file });
          await this.marketVolumeRepository.save(newVolume);
        }
      }
    }

    if (dto.tags) {
      for (const tag of dto.tags) {
        const existingTag = await this.marketTagRepository.findOne({
          where: { tagName: tag.tagName, marketFile: { id: fileId } },
        });
        if (!existingTag) {
          const newTag = this.marketTagRepository.create({ ...tag, marketFile: file });
          await this.marketTagRepository.save(newTag);
        }
      }
    }

    if (dto.pestle) {
      for (const pestle of dto.pestle) {
        const existingPestle = await this.pestleAnalysisRepository.findOne({
          where: { category: pestle.category, marketFile: { id: fileId } },
        });
        if (existingPestle) {
          Object.assign(existingPestle, pestle);
          await this.pestleAnalysisRepository.save(existingPestle);
        } else {
          const newPestle = this.pestleAnalysisRepository.create({ ...pestle, marketFile: file });
          await this.pestleAnalysisRepository.save(newPestle);
        }
      }
    }

    file.lastSavedAt = new Date();
    await this.marketFileRepository.save(file);

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
          category: true,
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
    file.lastSavedAt = new Date();
    return await this.marketFileRepository.save(file);
  }

  async removeFile(fileId: number) {
    const file = await this.findOneFile(fileId);
    return await this.marketFileRepository.remove(file);
  }
}