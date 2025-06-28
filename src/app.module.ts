import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';
import { GroupsModule } from './groups/groups.module';
import { PaymentsModule } from './payments/payments.module';
import { NotificationsModule } from './notifications/notifications.module';
import { StudentsModule } from './students/students.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { LearningCentersModule } from './learning_centers/learning_centers.module';
import { BranchesModule } from './branches/branches.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { RoomsModule } from './rooms/rooms.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { AttendancesModule } from './attendances/attendances.module';
import { MarketAnalysisModule } from './market-analysis/market-analysis.module';
import { CustomerAnalysisModule } from './customer-analysis/customer-analysis.module';
import { CompetitorAnalysisModule } from './competitor-analysis/competitor-analysis.module';
import { CourseAnalysisModule } from './course-analysis/course-analysis.module';
import { CustomerPersonaModule } from './customer-persona/customer-persona.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    CacheModule.register({ isGlobal: true }),
    TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'dpg-d1f6lkpr0fns73chkim0-a.oregon-postgres.render.com',
  port: 5432,
  username: 'ab_modme_user',
  password: '6iI34JX54lhmtA8DgpA6V3FfanvCMhye',
  database: 'ab_modme',
  autoLoadEntities: true,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
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
    MarketAnalysisModule,
    CustomerAnalysisModule,
    CompetitorAnalysisModule,
    CourseAnalysisModule,
    CustomerPersonaModule,
    AuthModule,
  ],
})
export class AppModule {}


