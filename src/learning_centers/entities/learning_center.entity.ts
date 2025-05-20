import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { Branch } from '../../branches/entities/branch.entity';

export enum CenterStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DEMO = 'demo',
  BLOCKED = 'blocked'
}

@Entity('learning_centers')
export class LearningCenter {
  @ApiProperty()
  @PrimaryGeneratedColumn()
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
  @Column({ type: 'date', nullable: true })
  demo_expiry_date: Date;

  @OneToMany(() => Subscription, (subscription) => subscription.center)
  subscriptions: Subscription[];

  @OneToMany(() => Branch, (branch) => branch.center)
  branches: Branch[];
}
