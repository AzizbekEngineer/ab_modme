// src/customer-analysis/entities/customer-feedback.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CustomerAnalysis } from './customer-analysis.entity';

@Entity('customer_feedback')
export class CustomerFeedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  importantFeatures: string;

  @Column({ type: 'text', nullable: true })
  desiredChanges: string;

  @Column({ type: 'text', nullable: true })
  priceVsQualityPreference: string;

  @Column({ type: 'text', nullable: true })
  preferredPaymentMethod: string;

  @Column({ type: 'text', nullable: true })
  likedDislikedAspects: string;

  @Column({ type: 'text', nullable: true })
  additionalSuggestions: string;

  @Column({ type: 'text', nullable: true })
  newsSourcePreference: string;

  @ManyToOne(() => CustomerAnalysis, customer => customer.feedback)
  customer: CustomerAnalysis;
}