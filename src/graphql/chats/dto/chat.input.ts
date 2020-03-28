import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class ChatInput {
  @Field(() => String)
  readonly message: string;

  @Field(() => String, { nullable: true })
  readonly sessionId: string;
}