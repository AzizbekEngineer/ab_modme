// src/competitor-analysis/entities/competitor-quality.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CompetitorAnalysis } from './competitor-analysis.entity';

@Entity('competitor_quality')
export class CompetitorQuality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  officeLocation: string;

  @Column({ type: 'text', nullable: true })
  staffBehavior: string;

  @Column({ type: 'text', nullable: true })
  callCenterQuality: string;

  @Column({ type: 'text', nullable: true })
  customerCare: string;

  @Column({ type: 'text', nullable: true })
  productQuality: string;

  @ManyToOne(() => CompetitorAnalysis, competitor => competitor.quality)
  competitor: CompetitorAnalysis;
}