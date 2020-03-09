import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
class AttachmentType {
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
class SelectableType {
  @Field()
  readonly _id: string;

  @Field()
  readonly label: string;

  @Field()
  readonly value: string;
}

@ObjectType()
class PlanType {
  @Field()
  readonly _id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly price: string;
  
  @Field()
  readonly description: string;
}

@ObjectType()
export class ProductType {
  @Field(type => ID, { nullable: true })
  readonly _id: string;

  @Field({ nullable: true })
  readonly userId: string;

  @Field()
  readonly ibmDiscoveryDocumentId: string;

  @Field()
  readonly status: string;
  
  @Field()
  readonly archived: boolean;

  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field(type => [SelectableType])
  readonly values: SelectableType[];

  @Field(type => [SelectableType])
  readonly features: SelectableType[];

  @Field(type => [SelectableType])
  readonly pricing: SelectableType[];

  @Field(type => [SelectableType])
  readonly devices: SelectableType[];

  @Field(type => [SelectableType])
  readonly categories: SelectableType[];

  @Field(type => [PlanType])
  readonly plans: PlanType[];

  @Field(type => AttachmentType)
  readonly logo: AttachmentType;

  @Field(type => AttachmentType)
  readonly featured: AttachmentType;

  @Field(type => [AttachmentType])
  readonly attachments: AttachmentType[];
}