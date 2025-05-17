import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Student } from '../../students/entities/student.entity';
import { Group } from '../../groups/entities/group.entity';
import { Payment } from '../../payments/entities/payment.entity';
import { Attendance } from '../../attendances/entities/attendance.entity';

@Entity('enrollments')
export class Enrollment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  student_id: number;

  @Column()
  group_id: number;

  @Column({ type: 'date' })
  enrollment_date: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'finished'],
    default: 'active',
  })
  status: 'active' | 'inactive' | 'finished';

  @ManyToOne(() => Student)
  @JoinColumn({ name: 'student_id' })
  student: Student;

  @ManyToOne(() => Group)
  @JoinColumn({ name: 'group_id' })
  group: Group;

  @OneToMany(() => Payment, (p) => p.enrollment)
  payments: Payment[];

  @OneToMany(() => Attendance, (attendance) => attendance.enrollment)
  attendances: Attendance[];
}
