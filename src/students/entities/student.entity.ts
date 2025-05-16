import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Notification } from '../../notifications/entities/notification.entity';

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

  @OneToMany(() => Notification, (n) => n.student)
  notifications: Notification[];
}
