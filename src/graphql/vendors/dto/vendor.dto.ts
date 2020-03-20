import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class VendorType {
  @Field(type => ID)
  readonly _id: string;

  @Field()
  readonly userId: string;

  @Field()
  readonly name: string;

  @Field()
  readonly contact: string;

  @Field()
  readonly website: string;

  @Field()
  readonly facebook: string;

  @Field()
  readonly location: string;

  @Field()
  readonly linkedIn: string;

  @Field()
  readonly twitter: string;

  @Field()
  readonly founded: string;
}