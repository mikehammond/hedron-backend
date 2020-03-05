import { InputType, Field } from 'type-graphql';

@InputType()
class Plan {
  @Field()
  readonly name: string;

  @Field()
  readonly price: string;
  
  @Field()
  readonly description: string;
}

@InputType()
class Attachment {
  @Field()
  readonly filename: string;
  
  @Field()
  readonly url: string;
  
  @Field()
  readonly mimetype: string;
  
  @Field()
  readonly size: number;
}

@InputType()
class Selectable {
  @Field()
  readonly label: string;

  @Field()
  readonly value: string;
}

@InputType()
export class ProductInput {
  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field(type => [Selectable])
  readonly values: Selectable[];

  @Field(type => [Selectable])
  readonly features: Selectable[];

  @Field(type => [Selectable])
  readonly pricing: Selectable[];

  @Field(type => [Selectable])
  readonly devices: Selectable[];

  @Field(type => [Selectable])
  readonly categories: Selectable[];

  @Field(type => [Plan])
  readonly plans: Plan[];

  @Field(type => Attachment)
  readonly logo: Attachment;

  @Field(type => Attachment)
  readonly featured: Attachment;

  @Field(type => [Attachment])
  readonly attachments: Attachment[];
}


@InputType()
export class ProductFilter {
  @Field({ nullable: true })
  readonly archived: boolean;

  @Field({ nullable: true })
  readonly status: string;

  @Field({ nullable: true })
  readonly userId: string;
}