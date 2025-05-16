import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsPositive, IsDateString } from 'class-validator';
import { PaymentMethod } from '../entities/payment.entity';

export class CreatePaymentDto {
  @ApiProperty({ example: 42 })
  @IsPositive()
  enrollmentId: number;

  @ApiProperty({ example: 150.0 })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ example: '2025-05-01', description: 'Oy boshi sanasi' })
  @IsDateString()
  paymentMonth: Date;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
