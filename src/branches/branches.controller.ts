import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { BranchService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UpdateBranchDto } from './dto/update-branch.dto';

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
  findAll() {
    return this.service.findAll();
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
