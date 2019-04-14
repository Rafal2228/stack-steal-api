import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ANWSER_FILTER } from '../constants';
import { AnswerService } from './answer.service';
import { QuestionsService } from './questions.service';
import { UsersService } from './users.service';

describe('QuestionsService', () => {
  let service: QuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [QuestionsService, UsersService, AnswerService, { provide: ANWSER_FILTER, useValue: 'default' }],
    }).compile();

    service = module.get<QuestionsService>(QuestionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
