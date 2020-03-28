import { Module, UnauthorizedException } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { verifyJWT } from '../utils/helpers';
import { ProductsModule } from './products/products.module';
import { DemoRequestsModule } from './demo-requests/demo-requests.module';
import { ChatsModule } from './chats/chats.module';
import { VendorsModule } from './vendors/vendors.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'src/graphql/schema.gql',
      definitions: {
        path: 'src/graphql/graphql.ts',
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
    ProductsModule,
    DemoRequestsModule,
    ChatsModule,
    VendorsModule,
    ReviewsModule
  ],
  providers: []
})
export class AppGraphqlModule {}
