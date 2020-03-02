import { Module, UnauthorizedException } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ProductsModule } from './products/products.module';
import { verifyJWT } from 'src/utils/helpers';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/app-graphql/schema.gql',
      definitions: {
        path: 'src/app-graphql/graphql.ts',
      },
      context: async ({ req }) => {
        try {
          const verified = await verifyJWT(req.headers.authorization.split(' ')[1]);
          return { verified };
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
