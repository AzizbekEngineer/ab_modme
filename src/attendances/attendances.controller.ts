import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AttendanceService } from './attendances.service';

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
  findAll() {
    return this.service.findAll();
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
