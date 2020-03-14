import { Module } from '@nestjs/common';
import { ChatsResolver } from './chats.resolver';
import { SharedModule } from '../../shared/shared.module';

@Module({
  imports: [SharedModule],
  providers: [ChatsResolver]
})
export class ChatsModule {}
