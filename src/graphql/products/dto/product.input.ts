import { InputType, Field } from '@nestjs/graphql';

@InputType()
class ValueInput {
  @Field({ nullable: true })
  readonly name: string;
  
  @Field({ nullable: true })
  readonly description: string;
}

@InputType()
class AttachmentInput {
  @Field({ nullable: true })
  readonly filename: string;
  
  @Field({ nullable: true })
  readonly url: string;
  
  @Field({ nullable: true })
  readonly mimetype: string;
  
  @Field({ nullable: true })
  readonly size: number;
}

@InputType()
class SelectableInput {
  @Field({ nullable: true })
  readonly label: string;

  @Field({ nullable: true })
  readonly value: string;
}

@InputType()
class PlanInput {
  @Field({ nullable: true })
  readonly name: string;

  @Field({ nullable: true })
  readonly price: string;
  
  @Field(() => [SelectableInput], { nullable: true })
  readonly features: SelectableInput[];
}

@InputType()
export class ProductInput {
  @Field({ nullable: true })
  readonly status: string;

  @Field({ nullable: true })
  readonly name: string;

  @Field({ nullable: true })
  readonly summary: string;

  @Field({ nullable: true })
  readonly description: string;

  @Field(type => [ValueInput], { nullable: true })
  readonly values: ValueInput[];

  @Field(type => [SelectableInput], { nullable: true })
  readonly features: SelectableInput[];

  @Field(type => [SelectableInput], { nullable: true })
  readonly pricing: SelectableInput[];

  @Field(type => [SelectableInput], { nullable: true })
  readonly devices: SelectableInput[];

  @Field(type => [SelectableInput], { nullable: true })
  readonly categories: SelectableInput[];

  @Field(type => [PlanInput], { nullable: true })
  readonly plans: PlanInput[];

  @Field(type => AttachmentInput, { nullable: true })
  readonly logo: AttachmentInput;

  @Field(type => AttachmentInput, { nullable: true })
  readonly featured: AttachmentInput;

  @Field(type => [AttachmentInput], { nullable: true })
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