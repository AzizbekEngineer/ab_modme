import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CustomerAnalysis } from './customer-analysis.entity';

@Entity('customer_psychographics')
export class CustomerPsychographics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  hobbies: string;

  @Column({ type: 'text', nullable: true })
  socialMedia: string;

  @Column({ type: 'text', nullable: true })
  frequentWebsites: string;

  @Column({ type: 'text', nullable: true })
  values: string;

  @Column({ type: 'text', nullable: true })
  lifeGoals: string;

  @Column({ type: 'text', nullable: true })
  freeTimeActivities: string;

  @Column({ type: 'text', nullable: true })
  favoriteBrands: string;

  @ManyToOne(() => CustomerAnalysis, customer => customer.psychographics, { onDelete: 'CASCADE' })
  customer: CustomerAnalysis;
}