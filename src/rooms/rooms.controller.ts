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
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { RoomService } from './rooms.service';
import { Room } from './entities/room.entity';
import { PaginationDto } from '../common/pagination/pagination.dto';

@ApiTags('rooms')
@Controller('rooms')
export class RoomController {
  constructor(private readonly service: RoomService) {}

  @Post()
  @ApiOperation({ summary: 'Create room' })
  @ApiResponse({ status: 201, description: 'Room created' })
  create(@Body() dto: CreateRoomDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({
    status: 200,
    description: 'List of rooms',
    type: [Room],
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
  @ApiOperation({ summary: 'Get one room by id' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update room by id' })
  update(@Param('id') id: string, @Body() dto: UpdateRoomDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete room by id' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
