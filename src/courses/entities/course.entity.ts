import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum CourseStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  branch_id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  duration_month: number;

  @Column({ type: 'enum', enum: CourseStatus, default: CourseStatus.ACTIVE })
  status: CourseStatus;
}
