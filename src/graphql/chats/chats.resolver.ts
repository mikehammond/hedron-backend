import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MessageResponse } from 'ibm-watson/assistant/v2';

import { WatsonAssistantService } from '../../shared/services/watson-assistant.service';
import { ChatInput } from './dto/chat.input';
import { ChatType } from './dto/chat.dto';

@Resolver('Chats')
export class ChatsResolver {
  constructor(
    private readonly watsonAssistantService: WatsonAssistantService
  ) {}

  @Mutation(() => ChatType)
  async askQuestion(
    @Args('chat') chat: ChatInput
  ): Promise<ChatType | MessageResponse> {
    return this.watsonAssistantService.askQuestion(chat);
  }
}
