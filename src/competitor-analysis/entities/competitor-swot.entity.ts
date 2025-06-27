// src/competitor-analysis/entities/competitor-swot.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CompetitorAnalysis } from './competitor-analysis.entity';

@Entity('competitor_swot')
export class CompetitorSwot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  strength: string;

  @Column({ type: 'text', nullable: true })
  weakness: string;

  @Column({ type: 'text', nullable: true })
  opportunity: string;

  @Column({ type: 'text', nullable: true })
  threat: string;

  @ManyToOne(() => CompetitorAnalysis, competitor => competitor.swot)
  competitor: CompetitorAnalysis;
}