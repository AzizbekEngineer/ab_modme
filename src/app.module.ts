import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { GroupsModule } from './groups/groups.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { User } from './users/entities/user.entity';
import { Course } from './courses/entities/course.entity';
import { Group } from './groups/entities/group.entity';
import { Payment } from './payments/entities/payment.entity';
import { Notification } from './notifications/entities/notification.entity';
import { StudentsModule } from './students/students.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { LearningCentersModule } from './learning_centers/learning_centers.module';
import { BranchesModule } from './branches/branches.module';
import { LearningCenter } from './learning_centers/entities/learning_center.entity';
import { Student } from './students/entities/student.entity';
import { Branch } from './branches/entities/branch.entity';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { Subscription } from './subscriptions/entities/subscription.entity';
import { RoomsModule } from './rooms/rooms.module';
import { Room } from './rooms/entities/room.entity';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { Enrollment } from './enrollments/entities/enrollment.entity';
import { AttendancesModule } from './attendances/attendances.module';
import { Attendance } from './attendances/entities/attendance.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    CacheModule.register({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: +process.env.PG_PORT,
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.PG_DB,
      entities: [
        User,
        Course,
        Group,
        Payment,
        Notification,
        LearningCenter,
        Student,
        Branch,
        Subscription,
        Room,
        Enrollment,
        Attendance,
      ],
      synchronize: true,
    }),
    UsersModule,
    CoursesModule,
    GroupsModule,
    PaymentsModule,
    NotificationsModule,
    StudentsModule,
    LearningCentersModule,
    BranchesModule,
    SubscriptionsModule,
    RoomsModule,
    EnrollmentsModule,
    AttendancesModule,
  ],
})
export class AppModule {}
