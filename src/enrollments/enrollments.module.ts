import { Module } from '@nestjs/common';
import { EnrollmentService } from './enrollments.service';
import { EnrollmentController } from './enrollments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enrollment } from './entities/enrollment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment])],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
})
export class EnrollmentsModule {}
