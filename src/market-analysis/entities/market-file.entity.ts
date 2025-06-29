import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { MarketVolume } from './market-volume.entity';
import { MarketTag } from './market-tag.entity';
import { PestleAnalysis } from './pestle-analysis.entity';

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

  @OneToMany(() => MarketVolume, volume => volume.marketFile, { cascade: true })
  volumes: MarketVolume[];

  @OneToMany(() => MarketTag, tag => tag.marketFile, { cascade: true })
  tags: MarketTag[];

  @OneToMany(() => PestleAnalysis, pestle => pestle.marketFile, { cascade: true })
  pestleAnalyses: PestleAnalysis[];
}