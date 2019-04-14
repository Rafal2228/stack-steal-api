import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserType } from '../graphql.schema';
import { UserResource } from '../models/user.resource';

const userMock: UserResource = {
  reputation: 10,
  user_id: 10,
  user_type: 'does_not_exist',
  profile_image: 'profile',
  display_name: 'test',
  link: 'test.com',
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should change stack user data structure to expected model', () => {
    const user = service.mapUserToSchema(userMock);

    Object.keys(user).forEach(key => expect(key.includes('_')).toBe(false));
    expect(user.userType === UserType.doesNotExist).toBe(true);
  });

  it('should return null if not provided with object', () => {
    const nullUser = service.mapUserToSchema(null);
    expect(nullUser).toBe(null);

    const undefinedUser = service.mapUserToSchema(undefined);
    expect(undefinedUser).toBe(null);
  });
});
