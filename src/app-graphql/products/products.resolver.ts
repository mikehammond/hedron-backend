import { Resolver, Query } from '@nestjs/graphql';
import { ProductType } from './dto/product.dto';

@Resolver('Products')
export class ProductsResolver {
  @Query(() => [ProductType])
  async products(): Promise<ProductType[]> {
    return [
      { _id: "sadsafasf", name: "asdfasfa" },
      { _id: "sadsafasf", name: "asdfasfa" },
      { _id: "sadsafasf", name: "asdfasfa" },
    ]
  }
}
