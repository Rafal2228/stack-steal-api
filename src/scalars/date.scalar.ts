import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date')
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date passed as integer timestamp';

  parseValue(value: number): Date {
    return new Date(value);
  }

  serialize(value: Date): number {
    if (typeof value === 'number') {
      return value;
    }

    return value.getTime();
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }

    return null;
  }
}
