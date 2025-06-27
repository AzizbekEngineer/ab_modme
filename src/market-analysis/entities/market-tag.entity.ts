import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MarketAnalysis } from './market-analysis.entity';

@Entity('market_tags')
export class MarketTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  tagName: string;

  @ManyToOne(() => MarketAnalysis, marketAnalysis => marketAnalysis.tags, { onDelete: 'CASCADE' })
  marketAnalysis: MarketAnalysis;
}