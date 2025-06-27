// src/customer-persona/entities/customer-persona.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { CustomerPersonaPlan } from './customer-persona-plan.entity'

@Entity('customer_persona')
export class CustomerPersona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  personaName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  imageUrl: string;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  audiencePercentage: number;

  @Column({ type: 'integer', nullable: true })
  age: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  educationLevel: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  workExperience: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  jobTitle: string;

  @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true })
  annualIncome: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  maritalStatus: string;

  @Column({ type: 'integer', nullable: true })
  numberOfChildren: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  residence: string;

  @Column({ type: 'text', nullable: true })
  interests: string;

  @Column({ type: 'text', nullable: true })
  socialMedia: string;

  @Column({ type: 'text', nullable: true })
  values: string;

  @Column({ type: 'text', nullable: true })
  lifeGoals: string;

  @Column({ type: 'text', nullable: true })
  freeTimeActivities: string;

  @Column({ type: 'text', nullable: true })
  favoriteBrands: string;

  @Column({ type: 'text', nullable: true })
  purchaseMotivation: string;

  @Column({ type: 'text', nullable: true })
  nonPurchaseReasons: string;

  @Column({ type: 'text', nullable: true })
  painPoints: string;

  @Column({ type: 'text', nullable: true })
  influenceFactors: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => CustomerPersonaPlan, plan => plan.persona, { cascade: true })
  plans: CustomerPersonaPlan[];
}