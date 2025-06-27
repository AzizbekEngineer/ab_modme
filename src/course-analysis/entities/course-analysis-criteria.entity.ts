import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CourseAnalysis } from './course-analysis.entity';

@Entity('course_analysis_criteria')
export class CourseAnalysisCriteria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', nullable: true })
  lessonPlanReady: boolean;

  @Column({ type: 'boolean', nullable: true })
  generalMaterialReady: boolean;

  @Column({ type: 'boolean', nullable: true })
  blockMaterialReady: boolean;

  @Column({ type: 'boolean', nullable: true })
  lessonMaterialReady: boolean;

  @Column({ type: 'boolean', nullable: true })
  lessonScenarioReady: boolean;

  @Column({ type: 'boolean', nullable: true })
  gamesAndActivitiesReady: boolean;

  @Column({ type: 'boolean', nullable: true })
  combinationTasksReady: boolean;

  @Column({ type: 'boolean', nullable: true })
  motivationSystemExists: boolean;

  @Column({ type: 'boolean', nullable: true })
  teachersScoreAbove50: boolean;

  @ManyToOne(() => CourseAnalysis, courseAnalysis => courseAnalysis.criteria)
  courseAnalysis: CourseAnalysis;
}