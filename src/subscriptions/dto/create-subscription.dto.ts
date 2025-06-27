import { ApiProperty } from '@nestjs/swagger';
import { SubsStatus } from '../entities/subscription.entity';

export class CreateSubscriptionDto {
  @ApiProperty({ example: 1, description: 'Learning center ID' })
  center_id: number;

  @ApiProperty({
    example: '2025-05-01',
    description: 'Subscription start date (YYYY-MM-DD)',
  })
  start_date: string;

  @ApiProperty({
    example: '2026-05-01',
    description: 'Subscription end date (YYYY-MM-DD)',
  })
  end_date: string;

  @ApiProperty({
    example: 500000.0,
    description: 'Subscription amount',
  })
  amount: number;

  @ApiProperty({
    example: SubsStatus.ACCEPTED,
    enum: SubsStatus,
    description: 'Status of subscription',
  })
  status: SubsStatus;
}
