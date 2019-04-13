import { HttpModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { QuestionResolver } from './resolvers/question.resolver';
import { DateScalar } from './scalars/date.scalar';
import { AnswerService } from './services/answer.service';
import { FilterService } from './services/filter.service';
import { QuestionsService } from './services/questions.service';
import { UsersService } from './services/users.service';
import { anwserFilterProvider } from './providers/answer-filter.provider';

@Module({
  imports: [
    HttpModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true,
    }),
  ],
  providers: [
    FilterService,
    anwserFilterProvider,
    DateScalar,
    QuestionResolver,
    QuestionsService,
    UsersService,
    AnswerService,
  ],
})
export class AppModule {}
