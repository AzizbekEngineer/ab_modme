import { Module } from '@nestjs/common';
import { LearningCenterService } from './learning_centers.service';
import { LearningCenterController } from './learning_centers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningCenter } from './entities/learning_center.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LearningCenter])],
  controllers: [LearningCenterController],
  providers: [LearningCenterService],
})
export class LearningCentersModule {}
