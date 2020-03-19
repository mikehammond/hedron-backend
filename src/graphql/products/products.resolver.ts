import { Resolver, Query, Mutation, Args, Context, Subscription } from '@nestjs/graphql';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';
// import { PubSub } from 'graphql-subscriptions';

import { ProductType } from './dto/product.dto';
import { ProductInput, ProductFilter, SearchQueryInput } from './dto/product.input';
import { ProductsService } from '../../shared/services/products.service';
import { IUser } from '../../shared/interfaces/user.interface';
import { WatsonDicoveryService } from '../../shared/services/watson-discovery.service';

// const pubSub = new PubSub();

@Resolver('Products')
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly watsonDiscoveryService: WatsonDicoveryService
  ) {}

  @Query(() => [ProductType])
  async searchProducts(
    @Context('user') user: IUser,
    @Args('searchQueryInput') searchQueryInput: SearchQueryInput,
  ): Promise<ProductType[]> {
    const response = await this.watsonDiscoveryService.queryCollection(searchQueryInput);
    const ids = response.result.results.map(x => x.id);
    
    return await this.productsService.allProducts({
      ibmDiscoveryDocumentId: { $in: ids },
      status: 'approved',
      archived: false
    });
  }

  @Query(() => ProductType)
  async productByName(
    @Context('user') user: IUser,
    @Args('productName') productName: string,
  ): Promise<ProductType> {
    return await this.productsService.productByName(productName);
  }

  @Query(() => [ProductType])
  async allProducts(
    @Context('user') user: IUser,
    @Args('filter') filter: ProductFilter,
  ): Promise<ProductType[]> {
    if (!user || !user.permissions.includes('read:products')) {
      throw new UnauthorizedException('You do not have the permission to retrieve products');
    }
    
    return await this.productsService.allProducts(filter);
  }

  @Query(() => ProductType)
  async productById(
    @Context('user') user: IUser,
    @Args('productId') productId: string
  ) {
    if (!user || !user.permissions.includes('read:products')) {
      throw new UnauthorizedException('You do not have the permission to retrieve products');
    }

    return await this.productsService.productById(productId);
  }

  @Mutation(() => ProductType)
  async addProduct(
    @Context('user') user: IUser,
    @Args('product') product: ProductInput,
  ): Promise<ProductType> {
    if (!user || !user.permissions.includes('create:products')) {
      throw new UnauthorizedException('You do not have the permission to create a product');
    }

    return await this.productsService.addProduct(user.sub, product);
  }

  @Mutation(() => ProductType)
  async archiveProduct(
    @Context('user') user: IUser,
    @Args('productId') productId: string
  ): Promise<ProductType> {
    if (!user || !user.permissions.includes('archive:products')) {
      throw new UnauthorizedException('You do not have the permission to archive a product');
    }

    const product = await this.productsService.productById(productId);

    if (!product) {
      throw new NotFoundException(`product with id ${productId} does not exists`);
    }

    if (user.sub !== product.userId) {
      throw new UnauthorizedException('product is not yours to archive');
    }

    return await this.productsService.archiveProduct(productId);
  }

  @Mutation(() => ProductType)
  async restoreProduct(
    @Context('user') user: IUser,
    @Args('productId') productId: string
  ): Promise<ProductType> {
    if (!user || !user.permissions.includes('restore:products')) {
      throw new UnauthorizedException('You do not have the permission to restore a product');
    }

    const product = await this.productsService.productById(productId);

    if (!product) {
      throw new NotFoundException(`product with id ${productId} does not exists`);
    }

    if (user.sub !== product.userId) {
      throw new UnauthorizedException('product is not yours to restore');
    }

    return this.productsService.restoreProduct(productId);
  }

  @Mutation(() => ProductType)
  async deleteProduct(
    @Context('user') user: IUser,
    @Args('productId') productId: string
  ): Promise<ProductType> {
    if (!user || !user.permissions.includes('approve_changes:products')) {
      throw new UnauthorizedException('You do not have the permission to delete a product');
    }

    const product = await this.productsService.productById(productId);

    if (!product) {
      throw new NotFoundException(`product with id ${productId} does not exists`);
    }

    return this.productsService.deleteProduct(productId);
  }

  @Mutation(() => ProductType)
  async updateProduct(
    @Context('user') user: IUser,
    @Args('productId') productId: string,
    @Args('update') update: ProductInput
  ): Promise<ProductType> {
    if (!user || !user.permissions.includes('approve_changes:products')) {
      throw new UnauthorizedException('You do not have the permission to update product');
    }

    const product = await this.productsService.productById(productId);

    if (!product) {
      throw new NotFoundException(`product with id ${productId} does not exists`);
    }

    return this.productsService.updateProduct(productId, update);
  }

  // @Subscription(() => ProductType, {
  //   filter: (payload, variables) => payload.productId === variables.productId
  // })
  // async productUpdated(
  //   @Args('productId') productId: string
  // ) {
  //   return pubSub.asyncIterator('productUpdated');
  // }
}
