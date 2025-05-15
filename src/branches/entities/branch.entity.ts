import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum BranchStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('branches')
export class Branch {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @ApiProperty()
  @Column({ type: 'bigint' })
  center_id: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty()
  @Column({ type: 'text' })
  address: string;

  @ApiProperty()
  @Column({ type: 'varchar', nullable: true, unique:true })
  phone?: string;

  @ApiProperty()
  @Column({ type: 'bigint', nullable: true })
  manager_id?: number;

  @ApiProperty({ enum: BranchStatus })
  @Column({ type: 'enum', enum: BranchStatus, default: BranchStatus.ACTIVE })
  status: string;
}
