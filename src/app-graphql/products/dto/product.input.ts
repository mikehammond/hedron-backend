import { InputType, Field } from 'type-graphql';

@InputType()
class Plan {
  @Field()
  readonly name: string;

  @Field()
  readonly price: string;
  
  @Field()
  readonly details: string;
}

@InputType()
class Attachement {
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

  @Field(type => Attachement)
  readonly logo: Attachement;

  @Field(type => Attachement)
  readonly featured: Attachement;

  @Field(type => [Attachement])
  readonly attachments: Attachement[];
}


@InputType()
export class ProductFilter {
  @Field()
  readonly archived: boolean;

  @Field()
  readonly status: string;
}