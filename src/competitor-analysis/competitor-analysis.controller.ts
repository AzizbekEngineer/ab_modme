// src/competitor-analysis/competitor-analysis.controller.ts
import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CompetitorAnalysisService } from './competitor-analysis.service';
import { CreateCompetitorAnalysisDto, CreateCompetitorProductsDto, CreateCompetitorQualityDto, CreateCompetitorAudienceDto, CreateCompetitorSocialMediaDto, CreateCompetitorSwotDto, CreateCompetitorTrafficSourcesDto, CreateCompetitorSoftwareDto } from './dto/create-competitor-analysis.dto';

@Controller('competitor-analysis')
export class CompetitorAnalysisController {
  constructor(private readonly competitorAnalysisService: CompetitorAnalysisService) {}

  @Post()
  create(@Body() createCompetitorAnalysisDto: CreateCompetitorAnalysisDto) {
    return this.competitorAnalysisService.create(createCompetitorAnalysisDto);
  }

  @Post(':id/products')
  addProducts(@Param('id') id: number, @Body() createProductsDto: CreateCompetitorProductsDto) {
    return this.competitorAnalysisService.addProducts(id, createProductsDto);
  }

  @Post(':id/quality')
  addQuality(@Param('id') id: number, @Body() createQualityDto: CreateCompetitorQualityDto) {
    return this.competitorAnalysisService.addQuality(id, createQualityDto);
  }

  @Post(':id/audience')
  addAudience(@Param('id') id: number, @Body() createAudienceDto: CreateCompetitorAudienceDto) {
    return this.competitorAnalysisService.addAudience(id, createAudienceDto);
  }

  @Post(':id/social-media')
  addSocialMedia(@Param('id') id: number, @Body() createSocialMediaDto: CreateCompetitorSocialMediaDto) {
    return this.competitorAnalysisService.addSocialMedia(id, createSocialMediaDto);
  }

  @Post(':id/swot')
  addSwot(@Param('id') id: number, @Body() createSwotDto: CreateCompetitorSwotDto) {
    return this.competitorAnalysisService.addSwot(id, createSwotDto);
  }

  @Post(':id/traffic-sources')
  addTrafficSources(@Param('id') id: number, @Body() createTrafficSourcesDto: CreateCompetitorTrafficSourcesDto) {
    return this.competitorAnalysisService.addTrafficSources(id, createTrafficSourcesDto);
  }

  @Post(':id/software')
  addSoftware(@Param('id') id: number, @Body() createSoftwareDto: CreateCompetitorSoftwareDto) {
    return this.competitorAnalysisService.addSoftware(id, createSoftwareDto);
  }

  @Get()
  findAll() {
    return this.competitorAnalysisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.competitorAnalysisService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateCompetitorAnalysisDto: CreateCompetitorAnalysisDto) {
    return this.competitorAnalysisService.update(id, updateCompetitorAnalysisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.competitorAnalysisService.remove(id);
  }
}