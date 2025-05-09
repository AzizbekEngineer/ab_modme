import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsEnum(['sms', 'email', 'push'], { message: 'Type must be sms, email, or push' })
  type: string;
}