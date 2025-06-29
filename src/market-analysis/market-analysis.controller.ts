import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { MarketAnalysisService } from './market-analysis.service';
import { CreateMarketFileDto, MarketVolumeDto, CreateMarketTagDto, CreatePestleAnalysisDto, SaveAllDto } from './dto/create-market-analysis.dto';

@Controller('market-analysis')
export class MarketAnalysisController {
  constructor(private readonly marketAnalysisService: MarketAnalysisService) {}

  @Post('file')
  createFile(@Body() createMarketFileDto: CreateMarketFileDto) {
    return this.marketAnalysisService.createFile(createMarketFileDto);
  }

  @Post('file/:fileId/volumes')
  addVolume(@Param('fileId') fileId: number, @Body() marketVolumeDto: MarketVolumeDto) {
    return this.marketAnalysisService.addVolumeToFile(fileId, marketVolumeDto);
  }

  @Post('file/:fileId/tags')
  addTag(@Param('fileId') fileId: number, @Body() createMarketTagDto: CreateMarketTagDto) {
    return this.marketAnalysisService.addTagToFile(fileId, createMarketTagDto);
  }

  @Post('file/:fileId/pestle')
  addPestleAnalysis(@Param('fileId') fileId: number, @Body() createPestleAnalysisDto: CreatePestleAnalysisDto) {
    return this.marketAnalysisService.addPestleToFile(fileId, createPestleAnalysisDto);
  }

  @Post('file/:fileId/save-all')
  saveAll(@Param('fileId') fileId: number, @Body() saveAllDto: SaveAllDto) {
    return this.marketAnalysisService.saveAllToFile(fileId, saveAllDto);
  }

  @Get('file/:fileId')
  findOne(@Param('fileId') fileId: number) {
    return this.marketAnalysisService.findOneFile(fileId);
  }

  @Delete('file/:fileId')
  remove(@Param('fileId') fileId: number) {
    return this.marketAnalysisService.removeFile(fileId);
  }
}