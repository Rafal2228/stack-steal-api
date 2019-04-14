import { Test, TestingModule } from '@nestjs/testing';
import { isDate } from 'lodash';
import { AnswerResource } from '../models/answer.resource';
import { AnswerService } from './answer.service';
import { UsersService } from './users.service';

const answerMock: AnswerResource = {
  answer_id: 1,
  creation_date: 1555243099211,
};

describe('AnswerService', () => {
  let service: AnswerService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerService, UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    service = module.get<AnswerService>(AnswerService);

    spyOn(usersService, 'mapUserToSchema').and.callThrough();
  });

  it('should change keys to camel case and not call user service', () => {
    const answer = service.mapAnswerToSchema(answerMock);

    Object.keys(answer).forEach(key => expect(key.includes('_')).toBe(false));
    expect(isDate(answer.creationDate)).toBe(true);
    expect(usersService.mapUserToSchema).not.toBeCalled();
  });
});
