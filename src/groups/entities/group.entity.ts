import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Course } from '../../courses/entities/course.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  schedule: string;

  @ManyToOne(() => Course, (course) => course.groups)
  course: Course;

  @ManyToOne(() => User, (user) => user.groups)
  teacher: User;

  @ManyToMany(() => User)
  @JoinTable()
  students: User[];
}