import { UserResource } from './user.resource';

export interface QuestionResource {
  tags?: string[];
  owner?: UserResource;
  is_answered?: boolean;
  view_count?: number;
  answer_count?: number;
  score?: number;
  last_activity_date?: Date;
  creation_date?: Date;
  last_edit_date?: Date;
  question_id: number;
  link?: string;
  title?: string;
}
