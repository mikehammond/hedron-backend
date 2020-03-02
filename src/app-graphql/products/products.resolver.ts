import { Resolver, Query, Mutation, Args, Context, GqlContextType } from '@nestjs/graphql';

import { ProductType } from './dto/product.dto';
import { ProductInput, ProductFilter } from './dto/product.input';
import { ProductsService } from './products.service';

@Resolver('Products')
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @Query(() => [ProductType])
  async products(
    @Context('verified') context: GqlContextType,
    @Args('filter') filter: ProductFilter
  ): Promise<ProductType[]> {
    return this.productsService.products(filter);
  }

  @Mutation(() => ProductType)
  async addProduct(@Args('product') product: ProductInput): Promise<ProductType> {
    return this.productsService.addProduct(product);
  }

  @Mutation(() => ProductType)
  async trashProduct(@Args('productId') productId: string): Promise<ProductType> {
    return this.productsService.trashProduct(productId);
  }

  @Mutation(() => ProductType)
  async restoreProduct(@Args('productId') productId: string): Promise<ProductType> {
    return this.productsService.restoreProduct(productId);
  }

  @Mutation(() => ProductType)
  async deleteProduct(@Args('productId') productId: string): Promise<ProductType> {
    return this.productsService.deleteProduct(productId);
  }
}
