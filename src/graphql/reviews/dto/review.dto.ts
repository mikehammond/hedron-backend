import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class ReviewType {
  @Field(() => ID)
  readonly _id: string;

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