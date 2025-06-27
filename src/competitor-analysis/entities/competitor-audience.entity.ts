// src/competitor-analysis/entities/competitor-audience.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CompetitorAnalysis } from './competitor-analysis.entity';

@Entity('competitor_audience')
export class CompetitorAudience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  gender: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  ageRange: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  employmentStatus: string;

  @Column({ type: 'text', nullable: true })
  commonProblems: string;

  @Column({ type: 'text', nullable: true })
  contentTypes: string;

  @Column({ type: 'text', nullable: true })
  platformsUsed: string;

  @ManyToOne(() => CompetitorAnalysis, competitor => competitor.audience)
  competitor: CompetitorAnalysis;
}