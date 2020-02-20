import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class ProductType {
  @Field(() => ID)
  readonly _id: string;
  @Field()
  readonly name: string;
}