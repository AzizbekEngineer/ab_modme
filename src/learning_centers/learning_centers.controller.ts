import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { LearningCenterService } from './learning_centers.service';
import { CreateLearningCenterDto } from './dto/create-learning_center.dto';
import { UpdateLearningCenterDto } from './dto/update-learning_center.dto';
import { LearningCenter } from './entities/learning_center.entity';
import { PaginationDto } from '../common/pagination/pagination.dto';

@ApiTags('Learning Centers')
@Controller('learning-centers')
export class LearningCenterController {
  constructor(private readonly service: LearningCenterService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new learning center' })
  create(@Body() dto: CreateLearningCenterDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all learning centers' })
  @ApiResponse({
    status: 200,
    description: 'List of learning centers',
    type: [LearningCenter],
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({
    name: 'fromDate',
    required: false,
    type: String,
    example: '2025-01-01',
  })
  @ApiQuery({
    name: 'toDate',
    required: false,
    type: String,
    example: '2025-12-31',
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.service.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a learning center by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a learning center by ID' })
  @ApiParam({ name: 'id', type: Number })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLearningCenterDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a learning center' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
