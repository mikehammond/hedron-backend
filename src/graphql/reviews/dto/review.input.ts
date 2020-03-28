import { InputType, Float, Field } from '@nestjs/graphql';

@InputType()
export class ReviewInput {
  @Field(() => String)
  readonly userId: string;

  @Field(() => String)
  readonly productId: string;

  @Field(() => String)
  readonly name: string;

  @Field(() => String)
  readonly picture: string;

  @Field(() => Float)
  readonly rating: number;

  @Field(() => String)
  readonly review: string;
}