import { HttpService, Inject, Injectable } from '@nestjs/common';
import { camelCase } from 'lodash';
import { map } from 'rxjs/operators';
import { ANWSER_FILTER, REQUEST_DEFAULT_PARAMS, STACK_BASE_URL } from '../constants';
import { Answer, GetQuestionsResponse, Question } from '../graphql.schema';
import { StackResponse } from '../models/stack-response';
import { AnswerService } from './answer.service';
import { UsersService } from './users.service';

@Injectable()
export class QuestionsService {
  private readonly questionsBaseUrl = `${STACK_BASE_URL}/questions`;
  private readonly searchBaseUrl = `${STACK_BASE_URL}/search`;

  constructor(
    private readonly http: HttpService,
    private readonly usersService: UsersService,
    private readonly answerService: AnswerService,
    @Inject(ANWSER_FILTER) private readonly answerFilter: string,
  ) {}

  async findOneById(questionId: number) {
    return this.http
      .get<StackResponse<Question>>(`${this.questionsBaseUrl}/${questionId}`, {
        params: REQUEST_DEFAULT_PARAMS,
      })
      .pipe(map(res => this.mapQuestionToSchema(res.data.items[0])))
      .toPromise();
  }

  async searchQuestions(intitle: string, page = 1, pagesize = 30): Promise<GetQuestionsResponse> {
    const params = {
      ...REQUEST_DEFAULT_PARAMS,
      intitle,
      page,
      pagesize,
    };

    const res = await this.http.get<StackResponse<Question[]>>(this.searchBaseUrl, { params }).toPromise();

    const data = res.data.items.map(question => this.mapQuestionToSchema(question));
    const hasMore = !!res.data.has_more;

    return {
      data,
      hasMore,
    };
  }

  async findQuestionAnswers(questionId: number, page = 1, pagesize = 30) {
    const params = {
      ...REQUEST_DEFAULT_PARAMS,
      page,
      pagesize,
      filter: this.answerFilter,
    };

    const res = await this.http
      .get<StackResponse<Answer[]>>(`${this.questionsBaseUrl}/${questionId}/answers`, { params })
      .toPromise();

    const data = res.data.items.map(question => this.answerService.mapAnswerToSchema(question));
    const hasMore = !!res.data.has_more;

    return {
      data,
      hasMore,
    };
  }

  private mapQuestionToSchema(question: Question) {
    return Object.keys(question).reduce(
      (acc, key) => {
        if (key === 'owner') {
          acc.owner = this.usersService.mapUserToSchema(question.owner);
        } else {
          acc[camelCase(key)] = question[key];
        }

        return acc;
      },
      {} as Question,
    );
  }
}
