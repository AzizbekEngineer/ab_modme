import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { MarketVolume } from './market-volume.entity';
import { MarketTag } from './market-tag.entity';
import { PestleAnalysis } from './pestle-analysis.entity';
import { MarketFile } from './market-file.entity';

@Entity('market_analysis')
export class MarketAnalysis {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => MarketVolume, volume => volume.marketAnalysis, { cascade: true })
  volumes: MarketVolume[];

  @OneToMany(() => MarketTag, tag => tag.marketAnalysis, { cascade: true })
  tags: MarketTag[];

  @OneToMany(() => PestleAnalysis, pestle => pestle.marketAnalysis, { cascade: true })
  pestleAnalyses: PestleAnalysis[];

  @OneToMany(() => MarketFile, file => file.marketAnalysis, { cascade: true })
  files: MarketFile[];
}