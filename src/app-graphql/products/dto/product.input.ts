import { InputType, Field } from 'type-graphql';

@InputType()
export class ProductInput {
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
}

@InputType()
export class ProductFilter {
  @Field()
  readonly trashed: boolean;
}