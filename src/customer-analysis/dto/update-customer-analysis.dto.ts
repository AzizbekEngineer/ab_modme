import { PartialType } from '@nestjs/swagger';
import { CreateCustomerAnalysisDto } from './create-customer-analysis.dto';

export class UpdateCustomerAnalysisDto extends PartialType(CreateCustomerAnalysisDto) {}
