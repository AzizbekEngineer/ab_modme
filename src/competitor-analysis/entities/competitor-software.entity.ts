// src/competitor-analysis/entities/competitor-software.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CompetitorAnalysis } from './competitor-analysis.entity';

@Entity('competitor_software')
export class CompetitorSoftware {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  crm: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cms: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  projectManagement: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  analytics: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  communicationTool: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  securityTool: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  videoProductionTool: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  telephony: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  graphicDesignTool: string;

  @ManyToOne(() => CompetitorAnalysis, competitor => competitor.software)
  competitor: CompetitorAnalysis;
}