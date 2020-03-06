import { Module, UnauthorizedException } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ProductsModule } from './products/products.module';
import { verifyJWT } from '../utils/helpers';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/app-graphql/schema.gql',
      definitions: {
        path: 'src/app-graphql/graphql.ts',
      },
      context: async ({ req }) => {
        try {
          const user = await verifyJWT(req.headers.authorization.split(' ')[1]);
          return { user };
        } catch (error) {
          throw new UnauthorizedException();
        }
      }
    }),
    ProductsModule
  ],
  providers: []
})
export class AppGraphqlModule {}
