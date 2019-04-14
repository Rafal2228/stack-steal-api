import { UserResource } from './user.resource';

export interface AnswerResource {
  owner?: UserResource;
  is_accepted?: boolean;
  score?: number;
  last_activity_date?: number;
  creation_date?: number;
  answer_id?: number;
  question_id?: number;
  body_markdown?: string;
}
