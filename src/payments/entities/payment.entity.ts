import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
}

const decimalTransformer = {
  to: (value: number) => value, 
  from: (value: string) => parseFloat(value), 
};

@Entity({ name: 'payments' })
export class Payment {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ example: 42 })
  @Column({ type: 'bigint' })
  enrollmentId: number;

  @ManyToOne(() => Enrollment, (en) => en.payments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'enrollmentId' })
  enrollment: Enrollment;

  @ApiProperty({ example: 150.0 })
  @Column({ type: 'decimal', transformer: decimalTransformer })
  amount: number;

  @ApiProperty({ example: '2025-05-31' })
  @CreateDateColumn({ name: 'payment_date', type: 'date' })
  paymentDate: Date;

  @ApiProperty({ example: '2025-05-01' })
  @Column({ name: 'payment_month', type: 'date' })
  paymentMonth: Date;

  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.CASH })
  @Column({ type: 'enum', enum: PaymentMethod })
  paymentMethod: PaymentMethod;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
