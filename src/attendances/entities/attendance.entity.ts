import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

@Entity('attendances')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  enrollment_id: number;

  @Column({ type: 'date' })
  date: string;

  @Column({
    type: 'enum',
    enum: ['present', 'absent', 'late'],
    default: 'present',
  })
  status: 'present' | 'absent' | 'late';

  @ManyToOne(() => Enrollment)
  @JoinColumn({ name: 'enrollment_id' })
  enrollment: Enrollment;
}
