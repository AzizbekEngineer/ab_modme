import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { CourseAnalysisCriteria } from './course-analysis-criteria.entity';

@Entity('course_analysis')
export class CourseAnalysis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  subjectName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  companyName: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => CourseAnalysisCriteria, criteria => criteria.courseAnalysis, { cascade: true })
  criteria: CourseAnalysisCriteria[];
}