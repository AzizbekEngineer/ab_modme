// src/competitor-analysis/entities/competitor-social-media.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CompetitorAnalysis } from './competitor-analysis.entity';

@Entity('competitor_social_media')
export class CompetitorSocialMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  platform: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  url: string;

  @Column({ type: 'integer', nullable: true })
  subscribers: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  frequency: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  er: string;

  @ManyToOne(() => CompetitorAnalysis, competitor => competitor.socialMedia)
  competitor: CompetitorAnalysis;
}