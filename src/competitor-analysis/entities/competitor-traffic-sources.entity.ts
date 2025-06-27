// src/competitor-analysis/entities/competitor-traffic-sources.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CompetitorAnalysis } from './competitor-analysis.entity';

@Entity('competitor_traffic_sources')
export class CompetitorTrafficSources {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', nullable: true })
  metaAds: boolean;

  @Column({ type: 'boolean', nullable: true })
  googleAds: boolean;

  @Column({ type: 'boolean', nullable: true })
  yandexAds: boolean;

  @Column({ type: 'boolean', nullable: true })
  linkedinAds: boolean;

  @Column({ type: 'boolean', nullable: true })
  xAds: boolean;

  @Column({ type: 'boolean', nullable: true })
  influencerMarketing: boolean;

  @Column({ type: 'boolean', nullable: true })
  seo: boolean;

  @Column({ type: 'text', nullable: true })
  other: string;

  @ManyToOne(() => CompetitorAnalysis, competitor => competitor.trafficSources)
  competitor: CompetitorAnalysis;
}