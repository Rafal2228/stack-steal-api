import { Injectable } from '@nestjs/common';
import { camelCase } from 'lodash';
import { Answer } from 'src/graphql.schema';
import { UsersService } from './users.service';

@Injectable()
export class AnswerService {
  constructor(private readonly usersService: UsersService) {}

  mapAnswerToSchema(answer: Answer) {
    return Object.keys(answer).reduce(
      (acc, key) => {
        if (key === 'owner') {
          acc.owner = this.usersService.mapUserToSchema(answer.owner);
        } else {
          acc[camelCase(key)] = answer[key];
        }

        return acc;
      },
      {} as Answer,
    );
  }
}
