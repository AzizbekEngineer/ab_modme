import { Test, TestingModule } from '@nestjs/testing';
import { CourseAnalysisService } from './course-analysis.service';

describe('CourseAnalysisService', () => {
  let service: CourseAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseAnalysisService],
    }).compile();

    service = module.get<CourseAnalysisService>(CourseAnalysisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
