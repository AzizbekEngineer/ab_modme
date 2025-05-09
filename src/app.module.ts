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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'modme',
      entities: [User, Course, Group, Payment, Notification, Lead],
      synchronize: true,
    }),
    UsersModule,
    CoursesModule,
    GroupsModule,
    PaymentsModule,
    NotificationsModule,
    LeadsModule,
  ],
})
export class AppModule {}