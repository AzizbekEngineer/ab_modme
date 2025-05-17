import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { Student } from '../../students/entities/student.entity';
import { Room } from '../../rooms/entities/room.entity';
import { Course } from '../../courses/entities/course.entity';
import { LearningCenter } from '../../learning_centers/entities/learning_center.entity';

export enum BranchStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('branches')
export class Branch {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ type: 'bigint' })
  center_id: number;

  @ManyToOne(() => LearningCenter)
  @JoinColumn({ name: 'center_id' })
  center: LearningCenter;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty()
  @Column({ type: 'text' })
  address: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, unique: true })
  phone?: string;

//   @ApiProperty()
//   @Column({ type: 'bigint', nullable: true })
//   manager_id?: number;

//   @ManyToOne(() => User)
//   @JoinColumn({ name: 'manager_id' })
//   manager: User;

  @ApiProperty({ enum: BranchStatus })
  @Column({ type: 'enum', enum: BranchStatus, default: BranchStatus.ACTIVE })
  status: string;

  @OneToMany(() => User, (user) => user.branch)
  users: User[];

  @OneToMany(() => Student, (student) => student.branch)
  students: Student[];

  @OneToMany(() => Room, (room) => room.branch)
  rooms: Room[];

  @OneToMany(() => Course, (course) => course.branch)
  courses: Course[];
}
