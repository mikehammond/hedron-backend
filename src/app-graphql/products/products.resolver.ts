import { Resolver, Query, Mutation, Args, Context, Subscription } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

import { ProductType } from './dto/product.dto';
import { ProductInput, ProductFilter, SearchQueryInput } from './dto/product.input';
import { ProductsService } from '../../shared/services/products.service';
import { IUser } from '../../shared/interfaces/user.interface';
import { IBMDicoveryService } from '../../shared/services/ibm-discovery.service';

const pubSub = new PubSub();

@Resolver('Products')
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly ibmDiscoveryService: IBMDicoveryService
  ) {}

  @Query(() => [ProductType])
  async searchProducts(
    @Context('user') user: IUser,
    @Args('searchQueryInput') searchQueryInput: SearchQueryInput,
  ): Promise<ProductType[]> {
    const response = await this.ibmDiscoveryService.queryCollection(searchQueryInput);
    const ids = response.result.results.map(x => x.id);
    
    return this.productsService.products({
      ibmDiscoveryDocumentId: { $in: ids },
      status: 'approved'
    });
  }

  @Query(() => ProductType)
  async getProductByName(
    @Context('user') user: IUser,
    @Args('productName') productName: string,
  ): Promise<ProductType> {
    return this.productsService.getProductByName(productName);
  }

  @Query(() => [ProductType])
  async products(
    @Context('user') user: IUser,
    @Args('filter') filter: ProductFilter,
  ): Promise<ProductType[]> {
    if (!user || !user.permissions.includes('read:products')) {
      throw new UnauthorizedException('You do not have the permission to retrieve products');
    }
    
    return this.productsService.products(filter);
  }

  @Query(() => ProductType)
  async getProductById(
    @Context('user') user: IUser,
    @Args('productId') productId: string
  ) {
    if (!user || !user.permissions.includes('read:products')) {
      throw new UnauthorizedException('You do not have the permission to retrieve products');
    }

    return this.productsService.getProductById(productId);
  }

  @Mutation(() => ProductType)
  async addProduct(
    @Context('user') user: IUser,
    @Args('product') product: ProductInput,
  ): Promise<ProductType> {
    if (!user || !user.permissions.includes('create:products')) {
      throw new UnauthorizedException('You do not have the permission to create a product');
    }

    return this.productsService.addProduct(user.sub, product);
  }

  @Mutation(() => ProductType)
  async archiveProduct(
    @Context('user') user: IUser,
    @Args('productId') productId: string
  ): Promise<ProductType> {
    if (!user || !user.permissions.includes('archive:products')) {
      throw new UnauthorizedException('You do not have the permission to archive a product');
    }

    return this.productsService.archiveProduct(user.sub, productId);
  }

  @Mutation(() => ProductType)
  async restoreProduct(
    @Context('user') user: IUser,
    @Args('productId') productId: string
  ): Promise<ProductType> {
    if (!user || !user.permissions.includes('restore:products')) {
      throw new UnauthorizedException('You do not have the permission to restore a product');
    }

    return this.productsService.restoreProduct(user.sub, productId);
  }

  @Mutation(() => ProductType)
  async deleteProduct(
    @Context('user') user: IUser,
    @Args('productId') productId: string
  ): Promise<ProductType> {
    if (!user || !user.permissions.includes('approve_changes:products')) {
      throw new UnauthorizedException('You do not have the permission to delete a product');
    }

    return this.productsService.deleteProduct(productId);
  }

  @Mutation(() => ProductType)
  async updateStatus(
    @Context('user') user: IUser,
    @Args('productId') productId: string,
    @Args('status') status: string
  ): Promise<ProductType> {
    if (!user || !user.permissions.includes('approve_changes:products')) {
      throw new UnauthorizedException('You do not have the permission to update product status');
    }

    pubSub.publish('productUpdated', {
      productUpdated: `Very Much Updated to ${status}`,
      productId
    });

    return this.productsService.updateStatus(productId, status);
  }

  @Subscription(() => String, {
    filter: (payload, variables) => payload.productId === variables.productId
  })
  async productUpdated(
    @Args('productId') productId: string
  ) {
    return pubSub.asyncIterator('productUpdated');
  }
}
