import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsEnum, IsString, IsNotEmpty } from 'class-validator';
import { NotificationStatus, NotificationType } from '../entities/notification.entity';


export class CreateNotificationDto {
  @ApiProperty({ example: 42 })
  @IsPositive()
  student_id: number;

  @ApiProperty({ enum: NotificationType })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty({ example: 'Lesson starts in 30 minutes' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ enum: NotificationStatus, required: false })
  @IsEnum(NotificationStatus)
  status?: NotificationStatus;
}
