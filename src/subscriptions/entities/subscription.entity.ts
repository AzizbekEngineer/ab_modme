import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  center_id: number;

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
