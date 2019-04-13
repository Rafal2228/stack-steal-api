import { Resolver, Query, Args, Parent, ResolveProperty } from '@nestjs/graphql';
import { QuestionsService } from '../services/questions.service';
import { Question } from '../graphql.schema';

@Resolver('Question')
export class QuestionResolver {
  constructor(private readonly questionsService: QuestionsService) {}

  @Query()
  async question(@Args('questionId') questionId: number) {
    return this.questionsService.findOneById(questionId);
  }

  @Query()
  async getQuestions(
    @Args('intitle') intitle?: string,
    @Args('page') page?: number,
    @Args('pagesize') pagesize?: number,
  ) {
    return this.questionsService.searchQuestions(intitle, page, pagesize);
  }

  @ResolveProperty('answers')
  async getAnswers(@Parent() parent: Question, @Args('page') page?: number, @Args('pagesize') pagesize?: number) {
    return this.questionsService.findQuestionAnswers(parent.questionId, page, pagesize);
  }
}
