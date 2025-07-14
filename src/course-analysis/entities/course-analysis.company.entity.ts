import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AnalysisFile } from './course-analysis.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  questions: { question: string; answers: string[] }[];

  @ManyToOne(() => AnalysisFile, file => file.companies)
  file: AnalysisFile;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}