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
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { AttendanceService } from './attendances.service';
import { PaginationDto } from '../common/pagination/pagination.dto';
import { Attendance } from './entities/attendance.entity';

@ApiTags('attendances')
@Controller('attendances')
export class AttendanceController {
  constructor(private readonly service: AttendanceService) {}

  @Post()
  @ApiOperation({ summary: 'Create attendance record' })
  create(@Body() dto: CreateAttendanceDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all attendance records' })
  @ApiResponse({
    status: 200,
    description: 'List of attendance records',
    type: [Attendance],
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
  @ApiOperation({ summary: 'Get one attendance record by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update attendance by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateAttendanceDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete attendance by ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
