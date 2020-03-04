import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class Plan {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  price: string;

  @ApiProperty()
  @IsNotEmpty()
  details: string;
}

export class ProductInput {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  values: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  features: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  pricing: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  devices: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  categories: string[];

  @ApiProperty({ type: Plan, isArray: true })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested()
  plans: Plan[];
}
