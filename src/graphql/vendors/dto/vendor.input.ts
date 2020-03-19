import { InputType, Field } from 'type-graphql';

@InputType()
export class VendorInput {
  @Field({ nullable: true })
  readonly name: string;

  @Field({ nullable: true })
  readonly contact: string;

  @Field({ nullable: true })
  readonly website: string;

  @Field({ nullable: true })
  readonly facebook: string;

  @Field({ nullable: true })
  readonly location: string;

  @Field({ nullable: true })
  readonly linkedIn: string;

  @Field({ nullable: true })
  readonly twitter: string;

  @Field({ nullable: true })
  readonly founded: string;
}