// src/competitor-analysis/competitor-analysis.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompetitorAnalysis } from './entities/competitor-analysis.entity';
import { CreateCompetitorAnalysisDto, CreateCompetitorProductsDto, CreateCompetitorQualityDto, CreateCompetitorAudienceDto, CreateCompetitorSocialMediaDto, CreateCompetitorSwotDto, CreateCompetitorTrafficSourcesDto, CreateCompetitorSoftwareDto } from './dto/create-competitor-analysis.dto';
import { CompetitorProducts } from './entities/competitor-products.entity';
import { CompetitorQuality } from './entities/competitor-quality.entity';
import { CompetitorAudience } from './entities/competitor-audience.entity';
import { CompetitorSocialMedia } from './entities/competitor-social-media.entity';
import { CompetitorSwot } from './entities/competitor-swot.entity';
import { CompetitorTrafficSources } from './entities/competitor-traffic-sources.entity';
import { CompetitorSoftware } from './entities/competitor-software.entity';

@Injectable()
export class CompetitorAnalysisService {
  constructor(
    @InjectRepository(CompetitorAnalysis)
    private competitorAnalysisRepository: Repository<CompetitorAnalysis>,
    @InjectRepository(CompetitorProducts)
    private productsRepository: Repository<CompetitorProducts>,
    @InjectRepository(CompetitorQuality)
    private qualityRepository: Repository<CompetitorQuality>,
    @InjectRepository(CompetitorAudience)
    private audienceRepository: Repository<CompetitorAudience>,
    @InjectRepository(CompetitorSocialMedia)
    private socialMediaRepository: Repository<CompetitorSocialMedia>,
    @InjectRepository(CompetitorSwot)
    private swotRepository: Repository<CompetitorSwot>,
    @InjectRepository(CompetitorTrafficSources)
    private trafficSourcesRepository: Repository<CompetitorTrafficSources>,
    @InjectRepository(CompetitorSoftware)
    private softwareRepository: Repository<CompetitorSoftware>,
  ) {}

  async create(createCompetitorAnalysisDto: CreateCompetitorAnalysisDto) {
    const competitorAnalysis = this.competitorAnalysisRepository.create(createCompetitorAnalysisDto);
    return await this.competitorAnalysisRepository.save(competitorAnalysis);
  }

  async addProducts(analysisId: number, createProductsDto: CreateCompetitorProductsDto) {
    const competitorAnalysis = await this.competitorAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!competitorAnalysis) throw new NotFoundException('Competitor analysis not found');
    const products = this.productsRepository.create({ ...createProductsDto, competitor: competitorAnalysis });
    return await this.productsRepository.save(products);
  }

  async addQuality(analysisId: number, createQualityDto: CreateCompetitorQualityDto) {
    const competitorAnalysis = await this.competitorAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!competitorAnalysis) throw new NotFoundException('Competitor analysis not found');
    const quality = this.qualityRepository.create({ ...createQualityDto, competitor: competitorAnalysis });
    return await this.qualityRepository.save(quality);
  }

  async addAudience(analysisId: number, createAudienceDto: CreateCompetitorAudienceDto) {
    const competitorAnalysis = await this.competitorAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!competitorAnalysis) throw new NotFoundException('Competitor analysis not found');
    const audience = this.audienceRepository.create({ ...createAudienceDto, competitor: competitorAnalysis });
    return await this.audienceRepository.save(audience);
  }

  async addSocialMedia(analysisId: number, createSocialMediaDto: CreateCompetitorSocialMediaDto) {
    const competitorAnalysis = await this.competitorAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!competitorAnalysis) throw new NotFoundException('Competitor analysis not found');
    const socialMedia = this.socialMediaRepository.create({ ...createSocialMediaDto, competitor: competitorAnalysis });
    return await this.socialMediaRepository.save(socialMedia);
  }

  async addSwot(analysisId: number, createSwotDto: CreateCompetitorSwotDto) {
    const competitorAnalysis = await this.competitorAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!competitorAnalysis) throw new NotFoundException('Competitor analysis not found');
    const swot = this.swotRepository.create({ ...createSwotDto, competitor: competitorAnalysis });
    return await this.swotRepository.save(swot);
  }

  async addTrafficSources(analysisId: number, createTrafficSourcesDto: CreateCompetitorTrafficSourcesDto) {
    const competitorAnalysis = await this.competitorAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!competitorAnalysis) throw new NotFoundException('Competitor analysis not found');
    const trafficSources = this.trafficSourcesRepository.create({ ...createTrafficSourcesDto, competitor: competitorAnalysis });
    return await this.trafficSourcesRepository.save(trafficSources);
  }

  async addSoftware(analysisId: number, createSoftwareDto: CreateCompetitorSoftwareDto) {
    const competitorAnalysis = await this.competitorAnalysisRepository.findOne({ where: { id: analysisId } });
    if (!competitorAnalysis) throw new NotFoundException('Competitor analysis not found');
    const software = this.softwareRepository.create({ ...createSoftwareDto, competitor: competitorAnalysis });
    return await this.softwareRepository.save(software);
  }

  async findAll() {
    return await this.competitorAnalysisRepository.find({ relations: ['products', 'quality', 'audience', 'socialMedia', 'swot', 'trafficSources', 'software'] });
  }

  async findOne(id: number) {
    const competitorAnalysis = await this.competitorAnalysisRepository.findOne({ where: { id }, relations: ['products', 'quality', 'audience', 'socialMedia', 'swot', 'trafficSources', 'software'] });
    if (!competitorAnalysis) throw new NotFoundException('Competitor analysis not found');
    return competitorAnalysis;
  }

  async update(id: number, updateCompetitorAnalysisDto: CreateCompetitorAnalysisDto) {
    const competitorAnalysis = await this.findOne(id);
    Object.assign(competitorAnalysis, updateCompetitorAnalysisDto);
    return await this.competitorAnalysisRepository.save(competitorAnalysis);
  }

  async remove(id: number) {
    const competitorAnalysis = await this.findOne(id);
    return await this.competitorAnalysisRepository.remove(competitorAnalysis);
  }
}