import { IsString, IsNumber, IsOptional, IsNotEmpty, IsDate, IsBoolean } from 'class-validator';

export class CreateCustomerAnalysisDto {
  @IsString()
  @IsOptional()
  analysisNumber?: string;

  @IsString()
  @IsOptional()
  companyRepresentative?: string;

  @IsString()
  @IsOptional()
  participantName?: string;

  @IsString()
  @IsOptional()
  image?: string; // Fayl nomi sifatida saqlash

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  maritalStatus?: string;

  @IsString()
  @IsOptional()
  educationLevel?: string;

  @IsString()
  @IsOptional()
  workplace?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsNumber()
  @IsOptional()
  annualIncome?: number;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  numberOfChildren?: string; // Matnga mos ravishda matn sifatida

  @IsString()
  @IsOptional()
  householdSize?: string; // Matnga mos ravishda matn sifatida

  @IsString()
  @IsOptional()
  languagesSpoken?: string;
}

export class CreateCustomerPsychographicsDto {
  @IsString()
  @IsOptional()
  hobbies?: string;

  @IsString()
  @IsOptional()
  socialMedia?: string;

  @IsString()
  @IsOptional()
  frequentWebsites?: string;

  @IsString()
  @IsOptional()
  values?: string;

  @IsString()
  @IsOptional()
  lifeGoals?: string;

  @IsString()
  @IsOptional()
  freeTimeActivities?: string;

  @IsString()
  @IsOptional()
  favoriteBrands?: string;
}

export class CreateCustomerBehaviorDto {
  @IsString()
  @IsOptional()
  purchaseFrequency?: string;

  @IsString()
  @IsOptional()
  purchaseLocation?: string;

  @IsString()
  @IsOptional()
  infoSources?: string;

  @IsString()
  @IsOptional()
  motivationFactors?: string;

  @IsString()
  @IsOptional()
  lastPurchaseDate?: string; // Matnga mos ravishda matn sifatida

  @IsString()
  @IsOptional()
  triesNewProducts?: string; // Boolean o‘rniga matn

  @IsString()
  @IsOptional()
  preferredMarketingChannel?: string;

  @IsString()
  @IsOptional()
  referralLikelihood?: string;

  @IsString()
  @IsOptional()
  brandSwitchReason?: string;
}

export class CreateCustomerFeedbackDto {
  @IsString()
  @IsOptional()
  importantFeatures?: string;

  @IsString()
  @IsOptional()
  desiredChanges?: string;

  @IsString()
  @IsOptional()
  priceVsQualityPreference?: string;

  @IsString()
  @IsOptional()
  preferredPaymentMethod?: string;

  @IsString()
  @IsOptional()
  likedDislikedAspects?: string;

  @IsString()
  @IsOptional()
  additionalSuggestions?: string;

  @IsString()
  @IsOptional()
  newsSourcePreference?: string;
}

export class CreateCustomerDynamicQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsOptional()
  answer?: string;
}