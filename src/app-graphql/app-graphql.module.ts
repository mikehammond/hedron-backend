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
      context: async ({ req, connection }) => {
        try {
          if (connection) {
            return connection.context;
          } else if (req.headers.authorization) {
            const user = await verifyJWT(req.headers.authorization.split(' ')[1]);
            return { user };
          } else {
            return { user: null };
          }
        } catch (error) {
          throw new UnauthorizedException();
        }
      },
      installSubscriptionHandlers: true
    }),
    ProductsModule
  ],
  providers: []
})
export class AppGraphqlModule {}
