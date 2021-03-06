import { HttpService, Injectable } from '@nestjs/common';
import { APP_KEY, STACK_BASE_URL } from '../constants';
import { StackResponse } from '../models/stack-response';
import { CreateFilterResource } from '../models/create-filter.resource';

@Injectable()
export class FilterService {
  private readonly baseUrl = `${STACK_BASE_URL}/filters`;

  constructor(private readonly http: HttpService) {}

  async createAnswerFilter() {
    // tslint:disable-next-line:no-console
    console.log('Creating answer filter...');

    const res = await this.http
      .post<StackResponse<CreateFilterResource[]>>(
        `${this.baseUrl}/create?key=${APP_KEY}&include=answer.body_markdown&unsafe=false`,
      )
      .toPromise();

    const filter = res.data.items[0].filter;

    // tslint:disable-next-line:no-console
    console.log(`Anwser filter created - ${filter}`);

    return filter;
  }
}
