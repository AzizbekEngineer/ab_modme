import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CustomerAnalysis } from './customer-analysis.entity';

@Entity('customer_behavior')
export class CustomerBehavior {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  purchaseFrequency: string;

  @Column({ type: 'text', nullable: true })
  purchaseLocation: string;

  @Column({ type: 'text', nullable: true })
  infoSources: string;

  @Column({ type: 'text', nullable: true })
  motivationFactors: string;

  @Column({ type: 'text', nullable: true })
  lastPurchaseDate: string;

  @Column({ type: 'text', nullable: true })
  triesNewProducts: string;

  @Column({ type: 'text', nullable: true })
  preferredMarketingChannel: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  referralLikelihood: string;

  @Column({ type: 'text', nullable: true })
  brandSwitchReason: string;

  @ManyToOne(() => CustomerAnalysis, customer => customer.behavior, { onDelete: 'CASCADE' })
  customer: CustomerAnalysis;
}