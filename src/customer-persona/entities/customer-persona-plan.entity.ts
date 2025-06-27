// src/customer-persona/entities/customer-persona-plan.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { CustomerPersona } from './customer-persona.entity';

@Entity('customer_persona_plan')
export class CustomerPersonaPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  type: string; // Reja, Hujum, Himoya

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => CustomerPersona, persona => persona.plans)
  persona: CustomerPersona;
}