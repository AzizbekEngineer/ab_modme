import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { MarketAnalysisService } from './market-analysis.service';
import { CreateMarketAnalysisDto, CreateMarketTagDto, CreatePestleAnalysisDto, CreateMarketFileDto, SaveAllDto, CreateFullMarketAnalysisDto, MarketVolumeDto } from './dto/create-market-analysis.dto';

@Controller('market-analysis')
export class MarketAnalysisController {
  constructor(private readonly marketAnalysisService: MarketAnalysisService) {}

  @Post()
  create(@Body() createMarketAnalysisDto: CreateMarketAnalysisDto) {
    return this.marketAnalysisService.create(createMarketAnalysisDto);
  }

  @Post('create-file')
  createFile(@Body() createMarketFileDto: CreateMarketFileDto) {
    return this.marketAnalysisService.createFile(createMarketFileDto);
  }

  @Post('full')
  createFull(@Body() createFullMarketAnalysisDto: CreateFullMarketAnalysisDto) {
    return this.marketAnalysisService.createFull(createFullMarketAnalysisDto);
  }

  @Post(':id/volumes')
  addVolume(@Param('id') id: number, @Body() marketVolumeDto: MarketVolumeDto) {
    return this.marketAnalysisService.addVolume(id, marketVolumeDto);
  }

  @Post(':id/tags')
  addTag(@Param('id') id: number, @Body() createMarketTagDto: CreateMarketTagDto) {
    return this.marketAnalysisService.addTag(id, createMarketTagDto);
  }

  @Post(':id/pestle')
  addPestleAnalysis(@Param('id') id: number, @Body() createPestleAnalysisDto: CreatePestleAnalysisDto) {
    return this.marketAnalysisService.addPestleAnalysis(id, createPestleAnalysisDto);
  }

  @Post(':id/files')
  addMarketFile(@Param('id') id: number, @Body() createMarketFileDto: CreateMarketFileDto) {
    return this.marketAnalysisService.addMarketFile(id, createMarketFileDto);
  }

  @Post(':id/save-all')
  saveAll(@Param('id') id: number, @Body() saveAllDto: SaveAllDto) {
    return this.marketAnalysisService.saveAll(id, saveAllDto);
  }

  @Get()
  findAll() {
    return this.marketAnalysisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.marketAnalysisService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateMarketAnalysisDto: CreateMarketAnalysisDto) {
    return this.marketAnalysisService.update(id, updateMarketAnalysisDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.marketAnalysisService.remove(id);
  }
}