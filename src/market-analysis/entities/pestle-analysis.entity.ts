import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MarketFile } from './market-file.entity';

@Entity('pestle_analysis')
export class PestleAnalysis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  category: string;

  @Column({ type: 'text', nullable: true })
  analysis: string;

  @Column({ type: 'text', nullable: true })
  impact: string;

  @ManyToOne(() => MarketFile, file => file.pestleAnalyses, { onDelete: 'CASCADE' })
  marketFile: MarketFile;
}