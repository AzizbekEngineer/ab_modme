import { Module } from '@nestjs/common';
import { AttendanceService } from './attendances.service';
import { AttendanceController } from './attendances.controller';
import { Attendance } from './entities/attendance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance])],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendancesModule {}
