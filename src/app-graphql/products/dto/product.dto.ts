import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class ProductType {
  @Field(() => ID)
  readonly _id: string;
  @Field()
  readonly name: string;
  @Field()
  readonly description: string;
  @Field()
  readonly ibmDiscoveryDocumentId: string;
  @Field()
  readonly trashed: boolean;
}