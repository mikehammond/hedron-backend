import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
class Attachment {
  @Field()
  readonly _id: string;

  @Field()
  readonly filename: string;
  
  @Field()
  readonly url: string;

  @Field()
  readonly mimetype: string;

  @Field()
  readonly size: number;
}

@ObjectType()
export class ProductType {
  @Field(type => ID)
  readonly _id: string;

  @Field()
  readonly userId: string;

  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field()
  readonly ibmDiscoveryDocumentId: string;

  @Field(type => [Attachment])
  readonly attachments: Attachment[];

  @Field()
  readonly status: string;
  
  @Field()
  readonly archived: boolean;
}