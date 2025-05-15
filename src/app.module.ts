import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { GroupsModule } from './groups/groups.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { LeadsModule } from './leads/leads.module';
import { User } from './users/entities/user.entity';
import { Course } from './courses/entities/course.entity';
import { Group } from './groups/entities/group.entity';
import { Payment } from './payments/entities/payment.entity';
import { Notification } from './notifications/entities/notification.entity';
import { Lead } from './leads/entities/lead.entity';
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
      entities: [User, Course, Group, Payment, Notification, Lead, LearningCenter, Student, Branch, Subscription],
      synchronize: true,
    }),
    UsersModule,
    CoursesModule,
    GroupsModule,
    PaymentsModule,
    NotificationsModule,
    LeadsModule,
    StudentsModule,
    LearningCentersModule,
    BranchesModule,
    SubscriptionsModule,
  ],
})
export class AppModule {}
