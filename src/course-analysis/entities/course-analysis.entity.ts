import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Company } from './course-analysis.company.entity';

@Entity()
export class AnalysisFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  fileName: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  data: {
    companyId: number;
    company: string;
    questions: { question: string; answers: string[] }[];
  }[];

  @OneToMany(() => Company, company => company.file, { cascade: true })
  companies: Company[];

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}