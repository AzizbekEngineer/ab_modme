import { Module } from '@nestjs/common';
import { BranchController } from './branches.controller';
import { BranchService } from './branches.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Branch])],
  controllers: [BranchController],
  providers: [BranchService],
})
export class BranchesModule {}
