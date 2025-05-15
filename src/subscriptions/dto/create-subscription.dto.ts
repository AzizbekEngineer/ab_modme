import { ApiProperty } from '@nestjs/swagger';

export class CreateSubscriptionDto {
  @ApiProperty()
  center_id: number;

  @ApiProperty()
  start_date: string;

  @ApiProperty()
  end_date: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  is_demo: boolean;

  @ApiProperty({ required: false })
  demo_start_date?: string;

  @ApiProperty({ required: false })
  demo_end_date?: string;

  @ApiProperty({ required: false })
  last_payment_date?: string;
}
