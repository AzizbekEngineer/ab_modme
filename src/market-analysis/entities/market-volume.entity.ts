import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MarketAnalysis } from './market-analysis.entity';

@Entity('market_volumes')
export class MarketVolume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  analysisType: string; // PAM, TAM, SAM, SOM

  @Column({ type: 'numeric', precision: 15, scale: 2 })
  value: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  percentage: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  currency: string; // so'm yoki dollar

  @ManyToOne(() => MarketAnalysis, analysis => analysis.volumes, { onDelete: 'CASCADE' })
  marketAnalysis: MarketAnalysis;
}