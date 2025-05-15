import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum GroupStatus {
  ACTIVE = 'active',
  FINISHED = 'finished',
  CANCELLED = 'cancelled',
}

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'bigint' })
  teacher_id: number;

  @Column({ type: 'bigint' })
  branch_id: number;

  @Column({ type: 'bigint' })
  course_id: number;

  @Column({ type: 'bigint' })
  room_id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @Column({ type: 'varchar' })
  schedule: string;

  @Column({ type: 'enum', enum: GroupStatus, default: GroupStatus.ACTIVE })
  status: GroupStatus;
}
