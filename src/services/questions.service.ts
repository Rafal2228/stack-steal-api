import { HttpService, Inject, Injectable } from '@nestjs/common';
import { camelCase } from 'lodash';
import { map } from 'rxjs/operators';
import { ANWSER_FILTER, REQUEST_DEFAULT_PARAMS, STACK_BASE_URL } from '../constants';
import { Answer, GetQuestionsResponse, Question } from '../graphql.schema';
import { StackResponse } from '../models/stack-response';
import { AnswerService } from './answer.service';
import { UsersService } from './users.service';
import { QuestionResource } from '../models/question.resource';
import { AnswerResource } from 'src/models/answer.resource';

@Injectable()
export class QuestionsService {
  static questionDateProps: Array<keyof QuestionResource> = ['creation_date', 'last_activity_date', 'last_edit_date'];

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
      .get<StackResponse<QuestionResource>>(`${this.questionsBaseUrl}/${questionId}`, {
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

    const res = await this.http.get<StackResponse<QuestionResource[]>>(this.searchBaseUrl, { params }).toPromise();

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
      .get<StackResponse<AnswerResource[]>>(`${this.questionsBaseUrl}/${questionId}/answers`, { params })
      .toPromise();

    const data = res.data.items.map(question => this.answerService.mapAnswerToSchema(question));
    const hasMore = !!res.data.has_more;

    return {
      data,
      hasMore,
    };
  }

  mapQuestionToSchema(question: QuestionResource): Question {
    if (!question) {
      return null;
    }

    return Object.keys(question).reduce(
      (acc, key: keyof QuestionResource) => {
        if (key === 'owner') {
          acc.owner = this.usersService.mapUserToSchema(question.owner);
        } else if (QuestionsService.questionDateProps.includes(key)) {
          acc[camelCase(key)] = new Date(question[(key as unknown) as number]);
        } else {
          acc[camelCase(key)] = question[key];
        }

        return acc;
      },
      {} as Question,
    );
  }
}
