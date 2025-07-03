import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { MarketFile } from './market-file.entity';

@Entity('market_volumes')
export class MarketVolume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'numeric', precision: 15, scale: 2 })
  value: number;

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  percentage?: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  currency?: string;

  @ManyToOne(() => MarketFile, file => file.volumes, { onDelete: 'CASCADE' })
  marketFile: MarketFile;
}