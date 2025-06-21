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
import { BranchService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { PaginationDto } from '../common/pagination/pagination.dto';
import { Branch } from './entities/branch.entity';

@ApiTags('Branches')
@Controller('branches')
export class BranchController {
  constructor(private readonly service: BranchService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new branch' })
  create(@Body() dto: CreateBranchDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all branches' })
  @ApiResponse({
    status: 200,
    description: 'List of branches',
    type: [Branch],
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
  @ApiOperation({ summary: 'Get branch by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Get('center/:id')
  @ApiOperation({ summary: 'Get branch by ID' })
  @ApiParam({ name: 'id', type: Number })
  findByCenterId(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByCenterId(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a branch by ID' })
  @ApiParam({ name: 'id', type: Number })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBranchDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a branch' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
