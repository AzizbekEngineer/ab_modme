import { IsString, IsNotEmpty, IsEnum, Matches, MinLength, IsOptional } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
    message: 'Invalid phone number format',
  })
  phone: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsEnum(['new', 'contacted', 'converted', 'lost'], { message: 'Status must be new, contacted, converted, or lost' })
  status: string;
}