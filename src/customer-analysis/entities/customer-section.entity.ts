import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { CustomerAnalysis } from './customer-analysis.entity';
import { CustomerQuestion } from './customer-question.entity';

@Entity()
export class CustomerSection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  company: string;
  
  @ManyToOne(() => CustomerAnalysis, analysis => analysis.sections)
  customerAnalysis: CustomerAnalysis;

  @OneToMany(() => CustomerQuestion, question => question.customerSection, { cascade: true })
  questions: CustomerQuestion[];

}