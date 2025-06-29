import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MarketFile } from './market-file.entity';

@Entity('market_tags')
export class MarketTag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  tagName: string;

  @ManyToOne(() => MarketFile, file => file.tags, { onDelete: 'CASCADE' })
  marketFile: MarketFile;
}