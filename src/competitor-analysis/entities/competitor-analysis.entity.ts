import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { CompetitorProducts } from './competitor-products.entity';
import { CompetitorQuality } from './competitor-quality.entity';
import { CompetitorAudience } from './competitor-audience.entity';
import { CompetitorSocialMedia } from './competitor-social-media.entity';
import { CompetitorSwot } from './competitor-swot.entity';
import { CompetitorTrafficSources } from './competitor-traffic-sources.entity';
import { CompetitorSoftware } from './competitor-software.entity';

@Entity('competitor_analysis')
export class CompetitorAnalysis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  marketShare: number;

  @Column({ type: 'date', nullable: true })
  foundedDate: Date;

  @Column({ type: 'integer', nullable: true })
  employeeCount: number;

  @Column({ type: 'integer', nullable: true })
  regionCount: number;

  @Column({ type: 'text', nullable: true })
  generalInfo: string;

  @Column({ type: 'integer', nullable: true })
  competitionLevel: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  createdBy: string;

  @Column({ type: 'date', nullable: true })
  analysisDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => CompetitorProducts, products => products.competitor, { cascade: true })
  products: CompetitorProducts[];

  @OneToMany(() => CompetitorQuality, quality => quality.competitor, { cascade: true })
  quality: CompetitorQuality[];

  @OneToMany(() => CompetitorAudience, audience => audience.competitor, { cascade: true })
  audience: CompetitorAudience[];

  @OneToMany(() => CompetitorSocialMedia, socialMedia => socialMedia.competitor, { cascade: true })
  socialMedia: CompetitorSocialMedia[];

  @OneToMany(() => CompetitorSwot, swot => swot.competitor, { cascade: true })
  swot: CompetitorSwot[];

  @OneToMany(() => CompetitorTrafficSources, traffic => traffic.competitor, { cascade: true })
  trafficSources: CompetitorTrafficSources[];

  @OneToMany(() => CompetitorSoftware, software => software.competitor, { cascade: true })
  software: CompetitorSoftware[];
}