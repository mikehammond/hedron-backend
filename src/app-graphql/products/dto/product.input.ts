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
export class ProductInput {
  @Field()
  readonly name: string;

  @Field(type => Attachement)
  readonly featured: Attachement;

  @Field()
  readonly description: string;

  @Field(type => [String])
  readonly values: string[];

  @Field(type => [String])
  readonly features: string[];

  @Field(type => [String])
  readonly pricing: string[];

  @Field(type => [String])
  readonly devices: string[];

  @Field(type => [String])
  readonly categories: string[];

  @Field(type => [Plan])
  readonly plans: Plan[];

  @Field(type => Attachement)
  readonly logo: Attachement;

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