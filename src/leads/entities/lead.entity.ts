import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('leads')
export class Lead {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  source: string;

  @Column({ type: 'enum', enum: ['new', 'contacted', 'converted', 'lost'], default: 'new' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}