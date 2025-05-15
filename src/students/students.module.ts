import { Module } from '@nestjs/common';
import { StudentService } from './students.service';
import { StudentController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentsModule {}
