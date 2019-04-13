import { Injectable } from '@nestjs/common';
import { camelCase } from 'lodash';
import { User, UserType } from '../graphql.schema';

@Injectable()
export class UsersService {
  mapUserToSchema(user: User) {
    return Object.keys(user).reduce(
      (acc, key) => {
        const camelCaseKey = camelCase(key);
        if (camelCaseKey === 'userType') {
          acc.userType = camelCase(user[key]) as UserType;
        } else {
          acc[camelCaseKey] = user[key];
        }

        return acc;
      },
      {} as User,
    );
  }
}
