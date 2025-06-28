import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CustomerAnalysis } from './customer-analysis.entity';

@Entity('customer_dynamic_question')
export class CustomerDynamicQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  question: string;

  @Column({ type: 'text', nullable: true })
  answer: string;

  @ManyToOne(() => CustomerAnalysis, customer => customer.dynamicQuestions, { onDelete: 'CASCADE' })
  customer: CustomerAnalysis;
}