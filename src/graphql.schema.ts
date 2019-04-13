
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum UserType {
    unregistered = "unregistered",
    registered = "registered",
    moderator = "moderator",
    team_admin = "team_admin",
    or = "or",
    does_not_exist = "does_not_exist"
}

export abstract class IQuery {
    abstract getQuestions(): Question[] | Promise<Question[]>;

    abstract question(user_id: number, intitle?: string, offset?: number, limit?: number): Question | Promise<Question>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class Question {
    tags?: string[];
    owner?: User;
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

export class User {
    reputation?: number;
    user_id: number;
    user_type?: UserType;
    profile_image?: string;
    display_name?: string;
    link?: string;
}

export type Date = any;
