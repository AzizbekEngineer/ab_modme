import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum CenterStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DEMO = 'demo',
  BLOCKED = 'blocked'
}

@Entity('learning_centers')
export class LearningCenter {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 20 })
  phone_number: string;

  @ApiProperty()
  @Column({ type: 'date' })
  registration_date: Date;

  @ApiProperty({ enum: CenterStatus })
  @Column({
    type: 'enum',
    enum: CenterStatus,
    default: CenterStatus.DEMO,
  })
  status: string;

  @ApiProperty()
  @Column({ type: 'date' })
  demo_expiry_date: Date;
}
