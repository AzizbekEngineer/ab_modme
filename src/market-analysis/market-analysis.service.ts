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
      id: 1,
      category: "Potensional bozor hajmi",
      description: "siz maxsulot/xizmatlaringizni sotish uchun potensional bozor hajmi",
      percentage: 0,
      value: 0,
      currency: "",
    },
    {
      id: 2,
      category: "Umumiy bozor hajmi",
      description: "siz maxsulot/xizmatlaringizni sotish uchun umumiy bozor",
      percentage: 0,
      value: 0,
      currency: "",
    },
    {
      id: 3,
      category: "Xizmat ko'rsatish mavjud bo'lgan bozor hajmi",
      description: "Sizning geografik joylashuvingizda mavjud bozor hajmi",
      percentage: 0,
      value: 0,
      currency: "",
    },
    {
      id: 4,
      category: "Siz olishingiz mumkin bo'lgan bozor hajmi",
      description: "",
      percentage: 0,
      value: 0,
      currency: "",
    },
  ],
  pestleAnalyses: [
    {
      id: 1,
      category: "Siyosiy (Political)",
      analysis: "",
      impact: "",
    },
    {
      id: 2,
      category: "Iqtisodiy (Economic)",
      analysis: "",
      impact: "",
    },
    {
      id: 3,
      category: "Ijtimoiy (Social)",
      analysis: "",
      impact: "",
    },
    {
      id: 4,
      category: "Texnologik (Technological)",
      analysis: "",
      impact: "",
    },
    {
      id: 5,
      category: "Qonuniy (Legal)",
      analysis: "",
      impact: "",
    },
    {
      id: 6,
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
  const file = this.marketFileRepository.create({
    fileName: createMarketFileDto.fileName,
    createdAt: new Date(),
    lastSavedAt: new Date(),
  });
  const savedFile = await this.marketFileRepository.save(file);

  const volumeEntities = dataMarketing.volumes.map((v) =>
    this.marketVolumeRepository.create({
      category: v.category,
      value: v.value,
      percentage: v.percentage,
      description: v.description,
      currency: v.currency,
      marketFile: savedFile,
    })
  );
  await this.marketVolumeRepository.save(volumeEntities);

  const pestleEntities = dataMarketing.pestleAnalyses.map((p) =>
    this.pestleAnalysisRepository.create({
      category: p.category,
      analysis: p.analysis,
      impact: p.impact,
      marketFile: savedFile,
    })
  );
  await this.pestleAnalysisRepository.save(pestleEntities);
  return this.marketFileRepository.findOne({
    where: { id: savedFile.id },
    relations: ['volumes', 'tags', 'pestleAnalyses'],
  });
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

  if (dto.volumes?.length) {
    const allExistingVolumes = await this.marketVolumeRepository.find({
      where: { marketFile: { id: fileId } },
    });

    for (const volume of dto.volumes) {
      const existing = allExistingVolumes.find(
        (v) => v.category.trim().toLowerCase() === volume.category.trim().toLowerCase()
      );
      if (existing) {
        Object.assign(existing, volume);
        await this.marketVolumeRepository.save(existing);
      } else {
        const newVolume = this.marketVolumeRepository.create({ ...volume, marketFile: file });
        await this.marketVolumeRepository.save(newVolume);
      }
    }
  }

  if (dto.tags?.length) {
    const allExistingTags = await this.marketTagRepository.find({
      where: { marketFile: { id: fileId } },
    });

    for (const tag of dto.tags) {
      const exists = allExistingTags.find(
        (t) => t.tagName.trim().toLowerCase() === tag.tagName.trim().toLowerCase()
      );
      if (!exists) {
        const newTag = this.marketTagRepository.create({ ...tag, marketFile: file });
        await this.marketTagRepository.save(newTag);
      }
    }
  }

  if (dto.pestle?.length) {
    const allExistingPestles = await this.pestleAnalysisRepository.find({
      where: { marketFile: { id: fileId } },
    });

    for (const pestle of dto.pestle) {
      const existing = allExistingPestles.find(
        (p) => p.category.trim().toLowerCase() === pestle.category.trim().toLowerCase()
      );
      if (existing) {
        Object.assign(existing, pestle);
        await this.pestleAnalysisRepository.save(existing);
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