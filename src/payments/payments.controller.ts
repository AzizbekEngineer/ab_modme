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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { PaginationDto } from '../common/pagination/pagination.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create payment' })
  @ApiResponse({ status: 201, type: Payment })
  create(@Body() dto: CreatePaymentDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List payments' })
  @ApiResponse({
    status: 200,
    description: 'List of payments',
    type: [Payment],
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
  @ApiOperation({ summary: 'Get payment by id' })
  @ApiResponse({ status: 200, type: Payment })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update payment' })
  @ApiResponse({ status: 200, type: Payment })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePaymentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete payment' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
