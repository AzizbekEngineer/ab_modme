import { Test, TestingModule } from '@nestjs/testing';
import { CourseAnalysisController } from './course-analysis.controller';
import { CourseAnalysisService } from './course-analysis.service';

describe('CourseAnalysisController', () => {
  let controller: CourseAnalysisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseAnalysisController],
      providers: [CourseAnalysisService],
    }).compile();

    controller = module.get<CourseAnalysisController>(CourseAnalysisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
