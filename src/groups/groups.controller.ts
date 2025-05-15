import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { GroupService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Groups')
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new group' })
  @ApiResponse({
    status: 201,
    description: 'Group successfully created',
    type: Group,
  })
  @ApiBody({ type: CreateGroupDto })
  create(@Body() dto: CreateGroupDto): Promise<Group> {
    return this.groupService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all groups' })
  @ApiResponse({ status: 200, description: 'List of groups', type: [Group] })
  findAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a group by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Group found', type: Group })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Group> {
    return this.groupService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a group by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Group successfully updated',
    type: Group,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateGroupDto>,
  ): Promise<Group> {
    return this.groupService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a group by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Group deleted' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.groupService.remove(id).then(() => ({
      message: 'Group deleted successfully',
    }));
  }
}
