// src/customer-analysis/entities/customer-analysis.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { CustomerPsychographics } from './customer-psychographics.entity';
import { CustomerBehavior } from './customer-behavior.entity';
import { CustomerFeedback } from './customer-feedback.entity';
import { CustomerDynamicQuestion } from './customer-dynamic-question.entity';

@Entity('customer_analysis')
export class CustomerAnalysis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  analysisNumber: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  companyRepresentative: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  participantName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageUrl: string;

  @Column({ type: 'integer', nullable: true })
  age: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  gender: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  maritalStatus: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  educationLevel: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  workplace: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  position: string;

  @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true })
  annualIncome: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location: string;

  @Column({ type: 'integer', nullable: true })
  numberOfChildren: number;

  @Column({ type: 'integer', nullable: true })
  householdSize: number;

  @Column({ type: 'text', nullable: true })
  languagesSpoken: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => CustomerPsychographics, psychographics => psychographics.customer, { cascade: true })
  psychographics: CustomerPsychographics[];

  @OneToMany(() => CustomerBehavior, behavior => behavior.customer, { cascade: true })
  behavior: CustomerBehavior[];

  @OneToMany(() => CustomerFeedback, feedback => feedback.customer, { cascade: true })
  feedback: CustomerFeedback[];

  @OneToMany(() => CustomerDynamicQuestion, question => question.customer, { cascade: true })
  dynamicQuestions: CustomerDynamicQuestion[];
}