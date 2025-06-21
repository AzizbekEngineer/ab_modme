import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { EnrollmentService } from './enrollments.service';
import { PaginationDto } from '../common/pagination/pagination.dto';
import { Enrollment } from './entities/enrollment.entity';

@ApiTags('enrollments')
@Controller('enrollments')
export class EnrollmentController {
  constructor(private readonly service: EnrollmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new enrollment' })
  create(@Body() dto: CreateEnrollmentDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all enrollments' })
  @ApiResponse({
    status: 200,
    description: 'List of enrollments',
    type: [Enrollment], 
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
  @ApiOperation({ summary: 'Get an enrollment by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an enrollment by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateEnrollmentDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an enrollment by ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
