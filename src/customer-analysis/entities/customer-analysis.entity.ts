import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CustomerSection } from './customer-section.entity';

@Entity()
export class CustomerAnalysis {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastSavedAt: Date;


  @OneToMany(() => CustomerSection, section => section.customerAnalysis, { cascade: true })
  sections: CustomerSection[];
}