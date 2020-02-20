import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

@Resolver('Product')
export class ProductResolver {
  @Query()
  async products() {
    return [
      { _id: 'gdgfdfg', name: 'Salesforce' },
      { _id: 'gdgfdfg', name: 'SAP' },
      { _id: 'gdgfdfg', name: 'Leadron' },
    ]
  }

  @Mutation()
  async addProduct(@Args('name') name: string) {
    return { _id: 'asdasasf', name };
  }
}
