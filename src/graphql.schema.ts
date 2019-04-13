
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export enum UserType {
    unregistered = "unregistered",
    registered = "registered",
    moderator = "moderator",
    teamAdmin = "teamAdmin",
    or = "or",
    doesNotExist = "doesNotExist"
}

export class Answer {
    owner?: User;
    isAccepted?: boolean;
    score?: number;
    lastActivityDate?: Date;
    creationDate?: Date;
    answerId?: number;
    questionId?: number;
    bodyMarkdown?: string;
}

export class AnwsersResponse {
    data?: Answer[];
    hasMore?: boolean;
}

export class GetQuestionsResponse {
    data?: Question[];
    hasMore?: boolean;
}

export abstract class IQuery {
    abstract getQuestions(intitle?: string, page?: number, pagesize?: number): GetQuestionsResponse | Promise<GetQuestionsResponse>;

    abstract question(questionId: number): Question | Promise<Question>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class Question {
    tags?: string[];
    owner?: User;
    isAnswered?: boolean;
    viewCount?: number;
    answerCount?: number;
    score?: number;
    lastActivityDate?: Date;
    creationDate?: Date;
    lastEditDate?: Date;
    questionId: number;
    link?: string;
    title?: string;
    answers?: AnwsersResponse;
}

export class User {
    reputation?: number;
    userId: number;
    userType?: UserType;
    profileImage?: string;
    displayName?: string;
    link?: string;
}

export type Date = any;
