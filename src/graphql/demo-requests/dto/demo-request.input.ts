import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DemoRequestInput {
  @Field()
  readonly sender: string;

  @Field()
  readonly receiver: string;

  @Field()
  readonly productId: string;

  @Field()
  readonly firstName: string;

  @Field()
  readonly lastName: string;

  @Field()
  readonly email: string;

  @Field()
  readonly phoneNumber: string;

  @Field()
  readonly company: string;

  @Field()
  readonly position: string;

  @Field()
  readonly website: string;

  @Field()
  readonly numberOfEmployees: string;

  @Field()
  readonly message: string;
}

@InputType()
export class DemoRequestFilter {
  @Field()
  readonly receiver: string;
}