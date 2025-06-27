// src/competitor-analysis/entities/competitor-products.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CompetitorAnalysis } from './competitor-analysis.entity';

@Entity('competitor_products')
export class CompetitorProducts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  productName: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  uniqueness: string;

  @ManyToOne(() => CompetitorAnalysis, competitor => competitor.products)
  competitor: CompetitorAnalysis;
}