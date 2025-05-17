import { ApiProperty } from '@nestjs/swagger';

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
    example: 'active',
    description: 'Status of subscription (e.g. active, expired)',
  })
  status: string;

  @ApiProperty({
    example: false,
    description: 'Whether this subscription is a demo version',
  })
  is_demo: boolean;

  @ApiProperty({
    required: false,
    example: '2025-05-01',
    description: 'Demo period start date (nullable)',
  })
  demo_start_date?: string;

  @ApiProperty({
    required: false,
    example: '2025-05-15',
    description: 'Demo period end date (nullable)',
  })
  demo_end_date?: string;

  @ApiProperty({
    required: false,
    example: '2025-05-17',
    description: 'The date when the last payment was made (nullable)',
  })
  last_payment_date?: string;
}
