import { ObjectType, Field } from "type-graphql";

@ObjectType()
class GenericType {
  @Field()
  readonly response_type: string;

  @Field()
  readonly text: string;
}

@ObjectType()
class IntentType {
  @Field()
  readonly intent: string;

  @Field()
  readonly confidence: number;
}

@ObjectType()
class EntityType {
  @Field()
  readonly productId: string;
}

@ObjectType()
class OutputType {
  @Field(() => [GenericType])
  readonly generic: GenericType[];

  @Field(() => [IntentType])
  readonly intents: IntentType[];

  @Field(() => [EntityType])
  readonly entities: EntityType[];
}

@ObjectType()
export class ChatType {
  @Field()
  readonly sessionId: string;

  @Field(() => OutputType)
  readonly output: OutputType;
}
