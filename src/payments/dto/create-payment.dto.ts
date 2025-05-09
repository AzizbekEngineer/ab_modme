import { IsDecimal, IsNotEmpty, IsEnum } from 'class-validator';

export class CreatePaymentDto {
  @IsDecimal()
  @IsNotEmpty()
  amount: number;

  @IsEnum(['pending', 'completed', 'failed'], { message: 'Status must be pending, completed, or failed' })
  status: string;
}