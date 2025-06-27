import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Notification } from '../../notifications/entities/notification.entity';
import { Branch } from '../../branches/entities/branch.entity';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum StudentStatus {
  ACTIVE = 'active',
  GRADUATED = 'graduated',
  DROPPED = 'dropped',
}

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'bigint' })
  branch_id: number;

  @ManyToOne(() => Branch)
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @Column({ type: 'varchar' })
  full_name: string;

  @Column({ type: 'varchar', unique: true })
  phone_number: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ type: 'int', default: 0 })
  budget: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Notification, (n) => n.student)
  notifications: Notification[];

  @OneToMany(() => Enrollment, (e) => e.student)
  enrollments: Enrollment[];
}
