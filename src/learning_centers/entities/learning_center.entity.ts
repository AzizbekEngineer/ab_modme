import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Subscription } from '../../subscriptions/entities/subscription.entity';
import { Branch } from '../../branches/entities/branch.entity';

export enum CenterStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
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

  @ApiProperty({ enum: CenterStatus })
  @Column({
    type: 'enum',
    enum: CenterStatus,
    default: CenterStatus.ACTIVE,
  })
  subscription_status: string;

  @ApiProperty()
  @Column({ type: 'date', nullable: true })
  demo_expiry_date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Subscription, (subscription) => subscription.center)
  subscriptions: Subscription[];

  @OneToMany(() => Branch, (branch) => branch.center)
  branches: Branch[];
}
