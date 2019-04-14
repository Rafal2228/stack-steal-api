import { Test, TestingModule } from '@nestjs/testing';
import { FilterService } from './filter.service';
import { HttpModule, HttpService } from '@nestjs/common';
import { StackResponse } from '../models/stack-response';
import { CreateFilterResource } from '../models/create-filter.resource';
import { STACK_BASE_URL, APP_KEY } from '../constants';
import { of } from 'rxjs';

const createFilterMock: StackResponse<CreateFilterResource[]> = {
  items: [{ filter: 'default' }],
  has_more: false,
  quota_max: 10,
  quota_remaining: 10,
};

describe('FilterService', () => {
  let http: HttpService;
  let service: FilterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [FilterService],
    }).compile();

    http = module.get<HttpService>(HttpService);
    spyOn(http, 'post').and.returnValue(of({ data: createFilterMock }));
    service = module.get<FilterService>(FilterService);
  });

  it('should call filters/create endpoint', async () => {
    const filter = await service.createAnswerFilter();

    expect(http.post).toBeCalledWith(
      `${STACK_BASE_URL}/filters/create?key=${APP_KEY}&include=answer.body_markdown&unsafe=false`,
    );
    expect(filter).toBe('default');
  });
});
