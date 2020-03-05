import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
class AttachmentOutput {
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
class SelectableOutput {
  @Field()
  readonly _id: string;

  @Field()
  readonly label: string;

  @Field()
  readonly value: string;
}

@ObjectType()
class PlanOutput {
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
  @Field(type => ID)
  readonly _id: string;

  @Field()
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

  @Field(type => [SelectableOutput])
  readonly values: SelectableOutput[];

  @Field(type => [SelectableOutput])
  readonly features: SelectableOutput[];

  @Field(type => [SelectableOutput])
  readonly pricing: SelectableOutput[];

  @Field(type => [SelectableOutput])
  readonly devices: SelectableOutput[];

  @Field(type => [SelectableOutput])
  readonly categories: SelectableOutput[];

  @Field(type => [PlanOutput])
  readonly plans: PlanOutput[];

  @Field(type => AttachmentOutput)
  readonly logo: AttachmentOutput;

  @Field(type => AttachmentOutput)
  readonly featured: AttachmentOutput;

  @Field(type => [AttachmentOutput])
  readonly attachments: AttachmentOutput[];
}