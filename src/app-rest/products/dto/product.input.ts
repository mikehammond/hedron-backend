import { IsNotEmpty, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class SearchQueryInput {
  @ApiProperty()
  @IsNotEmpty()
  query: string;
}
