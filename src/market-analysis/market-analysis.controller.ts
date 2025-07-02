import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { MarketAnalysisService } from './market-analysis.service';
import { CreateMarketFileDto, MarketVolumeDto, CreateMarketTagDto, CreatePestleAnalysisDto, SaveAllDto, UpdateMarketFileDto } from './dto/create-market-analysis.dto';

@Controller('market-analysis')
export class MarketAnalysisController {
  constructor(private readonly marketAnalysisService: MarketAnalysisService) {}

  @Post('file')
  createFile(@Body() createMarketFileDto: CreateMarketFileDto) {
    return this.marketAnalysisService.createFile(createMarketFileDto);
  }

  @Post('file/:fileId/save-all')
  saveAll(@Param('fileId') fileId: number, @Body() saveAllDto: SaveAllDto) {
    return this.marketAnalysisService.saveAll(fileId, saveAllDto);
  }

  @Get('files')
  findAllFiles() {
    return this.marketAnalysisService.findAllFiles();
  }

  @Get('file/:fileId')
  findOneFile(@Param('fileId') fileId: number) {
    return this.marketAnalysisService.findOneFile(fileId);
  }

  @Put('file/:fileId')
  updateFile(@Param('fileId') fileId: number, @Body() updateMarketFileDto: UpdateMarketFileDto) {
    return this.marketAnalysisService.updateFile(fileId, updateMarketFileDto);
  }

  @Delete('file/:fileId')
  removeFile(@Param('fileId') fileId: number) {
    return this.marketAnalysisService.removeFile(fileId);
  }
}