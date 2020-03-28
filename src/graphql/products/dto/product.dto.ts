import { ObjectType, Field, ID } from '@nestjs/graphql';

import { ReviewType } from '../../reviews/dto/review.dto';

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
  
  @Field(() => [SelectableType])
  readonly features: SelectableType[];
}

@ObjectType()
class ValueType {
  @Field()
  readonly _id: string;

  @Field({ nullable: true })
  readonly name: string;
  
  @Field({ nullable: true })
  readonly description: string;
}

@ObjectType()
export class ProductType {
  @Field(() => ID, { nullable: true })
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
  readonly slug: string;

  @Field()
  readonly summary: string;

  @Field()
  readonly description: string;

  @Field(() => [ValueType])
  readonly values: ValueType[];

  @Field(() => [SelectableType])
  readonly features: SelectableType[];

  @Field(() => [SelectableType])
  readonly pricing: SelectableType[];

  @Field(() => [SelectableType])
  readonly devices: SelectableType[];

  @Field(() => [SelectableType])
  readonly categories: SelectableType[];

  @Field(() => [PlanType])
  readonly plans: PlanType[];

  @Field(() => AttachmentType)
  readonly logo: AttachmentType;

  @Field(() => AttachmentType)
  readonly featured: AttachmentType;

  @Field(() => [AttachmentType])
  readonly attachments: AttachmentType[];

  @Field(() => [ReviewType])
  readonly reviews: ReviewType[]
}