import { InputType, Field } from "type-graphql";

@InputType()
export class ChatInput {
  @Field(() => String)
  readonly message: string;

  @Field(() => String, { nullable: true })
  readonly sessionId: string;
}