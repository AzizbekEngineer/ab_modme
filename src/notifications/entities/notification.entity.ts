import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  message: string;

  @Column({ type: 'enum', enum: ['sms', 'email', 'push'], default: 'sms' })
  type: string;

  @Column({ type: 'enum', enum: ['pending', 'sent', 'failed'], default: 'pending' })
  status: string;

  @ManyToOne(() => User)
  recipient: User;

  @CreateDateColumn()
  createdAt: Date;
}