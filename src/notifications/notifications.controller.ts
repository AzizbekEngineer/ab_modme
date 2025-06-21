import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import { PaginationDto } from '../common/pagination/pagination.dto';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create notification' })
  @ApiResponse({ status: 201, type: Notification })
  create(@Body() dto: CreateNotificationDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List notifications' })
  @ApiResponse({
    status: 200,
    description: 'List of notifications',
    type: [Notification],
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
  @ApiOperation({ summary: 'Get notification by id' })
  @ApiResponse({ status: 200, type: Notification })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update notification' })
  @ApiResponse({ status: 200, type: Notification })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNotificationDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete notification' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
