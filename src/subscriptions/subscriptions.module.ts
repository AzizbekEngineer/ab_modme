import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscriptions.controller';
import { SubscriptionService } from './subscriptions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Subscription])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionsModule {}
