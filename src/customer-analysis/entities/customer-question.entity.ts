import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CustomerSection } from './customer-section.entity';

@Entity()
export class CustomerQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column({ nullable: true })
  answer: string;

  @ManyToOne(() => CustomerSection, section => section.questions)
  customerSection: CustomerSection;
}