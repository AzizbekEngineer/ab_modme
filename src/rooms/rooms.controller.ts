import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoomService } from './rooms.service';

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
  findAll() {
    return this.service.findAll();
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
