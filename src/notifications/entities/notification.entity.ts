import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Student } from '../../students/entities/student.entity';

export enum NotificationType {
  PAYMENT_REMINDER = 'payment_reminder',
  ATTENDANCE_ALERT = 'attendance_alert',
}
export enum NotificationStatus {
  SENT = 'sent',
  FAILED = 'failed',
}

@Entity({ name: 'notifications' })
export class Notification {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ example: 42 })
  @Index()
  @Column({ type: 'bigint', name: 'student_id' })
  student_id: number;

  @ApiProperty({
    enum: NotificationType,
    example: NotificationType.PAYMENT_REMINDER,
  })
  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @ApiProperty({
    example: 'Your next lesson is tomorrow at 09:00, don’t be late!',
  })
  @Column({ type: 'text' })
  message: string;

  @ApiProperty({
    example: '2025-05-17T14:30:00Z',
    description: 'Yuborilgan vaqt (UTC)',
  })
  @CreateDateColumn({
    name: 'sent_at',
    type: 'timestamptz',
    default: () => 'now()',
  })
  sentAt: Date;

  @ApiProperty({ enum: NotificationStatus, example: NotificationStatus.SENT })
  @Column({
    type: 'enum',
    enum: NotificationStatus,
    default: NotificationStatus.SENT,
  })
  status: NotificationStatus;

  @ManyToOne(() => Student, (s) => s.notifications)
  @JoinColumn({ name: 'student_id' })
  student: Student;
}
