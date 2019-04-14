import { Injectable } from '@nestjs/common';
import { camelCase } from 'lodash';
import { Answer } from 'src/graphql.schema';
import { UsersService } from './users.service';
import { AnswerResource } from '../models/answer.resource';

@Injectable()
export class AnswerService {
  static answerDateProps: Array<keyof AnswerResource> = ['creation_date', 'last_activity_date'];

  constructor(private readonly usersService: UsersService) {}

  mapAnswerToSchema(answer: AnswerResource): Answer {
    if (!answer) {
      return null;
    }

    return Object.keys(answer).reduce(
      (acc, key: keyof AnswerResource) => {
        if (key === 'owner') {
          acc.owner = this.usersService.mapUserToSchema(answer.owner);
        } else if (AnswerService.answerDateProps.includes(key)) {
          acc[camelCase(key)] = new Date(answer[(key as unknown) as number]);
        } else {
          acc[camelCase(key)] = answer[key];
        }

        return acc;
      },
      {} as Answer,
    );
  }
}
