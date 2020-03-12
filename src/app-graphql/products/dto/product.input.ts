import { InputType, Field } from 'type-graphql';

@InputType()
class PlanInput {
  @Field()
  readonly name: string;

  @Field()
  readonly price: string;
  
  @Field()
  readonly description: string;
}

@InputType()
class ValueInput {
  @Field()
  readonly name: string;
  
  @Field()
  readonly description: string;
}

@InputType()
class AttachmentInput {
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
class SelectableInput {
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

  @Field(type => [ValueInput])
  readonly values: ValueInput[];

  @Field(type => [SelectableInput])
  readonly features: SelectableInput[];

  @Field(type => [SelectableInput])
  readonly pricing: SelectableInput[];

  @Field(type => [SelectableInput])
  readonly devices: SelectableInput[];

  @Field(type => [SelectableInput])
  readonly categories: SelectableInput[];

  @Field(type => [PlanInput])
  readonly plans: PlanInput[];

  @Field(type => AttachmentInput)
  readonly logo: AttachmentInput;

  @Field(type => AttachmentInput)
  readonly featured: AttachmentInput;

  @Field(type => [AttachmentInput])
  readonly attachments: AttachmentInput[];
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

@InputType()
export class SearchQueryInput {
  @Field({ nullable: true })
  readonly query: string;
}