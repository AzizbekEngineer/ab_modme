import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Group } from '../../groups/entities/group.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @ManyToOne(() => User, (user) => user.courses)
  teacher: User;

  @OneToMany(() => Group, (group) => group.course)
  groups: Group[];
}