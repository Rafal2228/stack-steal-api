import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DateScalar } from './scalars/date.scalar';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./schemas/*.graphql'],
      playground: true,
    }),
  ],
  providers: [DateScalar],
})
export class AppModule {}
