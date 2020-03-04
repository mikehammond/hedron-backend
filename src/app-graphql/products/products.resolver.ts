import { Resolver, Query, Mutation, Args, Context, GqlContextType } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

import { ProductType } from './dto/product.dto';
import { ProductInput, ProductFilter } from './dto/product.input';
import { ProductsService } from '../../shared/services/products.service';
import { IUser } from '../../shared/interfaces/user.interface';

@Resolver('Products')
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @Query(() => [ProductType])
  async products(
    @Context('user') user: IUser,
    @Args('filter') filter: ProductFilter,
  ): Promise<ProductType[]> {
    if (!user.permissions.includes('read:products')) {
      throw new UnauthorizedException('You do not have the permission to retrieve products');
    }
    
    return this.productsService.products(filter);
  }

  @Mutation(() => ProductType)
  async addProduct(
    @Context('user') user: IUser,
    @Args('product') product: ProductInput,
    @Args({name: 'uploads', type: () => [GraphQLUpload]}) uploads: [FileUpload]
  ): Promise<ProductType> {
    console.log(uploads);
    if (!user.permissions.includes('create:products')) {
      throw new UnauthorizedException('You do not have the permission to create a product');
    }

    return this.productsService.addProduct(user.sub, product);
  }

  @Mutation(() => ProductType)
  async archiveProduct(
    @Context('user') user: IUser,
    @Args('productId') productId: string
  ): Promise<ProductType> {
    if (!user.permissions.includes('archive:products')) {
      throw new UnauthorizedException('You do not have the permission to archive a product');
    }

    return this.productsService.archiveProduct(user.sub, productId);
  }

  @Mutation(() => ProductType)
  async restoreProduct(
    @Context('user') user: IUser,
    @Args('productId') productId: string
  ): Promise<ProductType> {
    if (!user.permissions.includes('restore:products')) {
      throw new UnauthorizedException('You do not have the permission to restore a product');
    }

    return this.productsService.restoreProduct(user.sub, productId);
  }

  @Mutation(() => ProductType)
  async deleteProduct(
    @Context('user') user: IUser,
    @Args('productId') productId: string
  ): Promise<ProductType> {
    if (!user.permissions.includes('delete:products')) {
      throw new UnauthorizedException('You do not have the permission to delete a product');
    }

    return this.productsService.deleteProduct(productId);
  }
}
