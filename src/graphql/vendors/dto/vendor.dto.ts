import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class VendorType {
  @Field(type => ID, { nullable: true })
  readonly _id: string;

  @Field({ nullable: true })
  readonly userId: string;

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