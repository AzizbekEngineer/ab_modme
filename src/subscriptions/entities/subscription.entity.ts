import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { LearningCenter } from '../../learning_centers/entities/learning_center.entity';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  center_id: number;

  @ManyToOne(() => LearningCenter)
  @JoinColumn({ name: 'center_id' })
  center: LearningCenter;

  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date' })
  end_date: string;

  @Column()
  status: string;

  @Column({ default: false })
  is_demo: boolean;

  @Column({ type: 'date', nullable: true })
  demo_start_date: string;

  @Column({ type: 'date', nullable: true })
  demo_end_date: string;

  @Column({ type: 'date', nullable: true })
  last_payment_date: string;
}
