import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MarketAnalysis } from './market-analysis.entity';

@Entity('market_files')
export class MarketFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  fileName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastSavedAt: Date;

  @ManyToOne(() => MarketAnalysis, marketAnalysis => marketAnalysis.files, { onDelete: 'CASCADE' })
  marketAnalysis: MarketAnalysis;
}