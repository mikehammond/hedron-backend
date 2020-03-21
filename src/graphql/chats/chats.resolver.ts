import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { MessageResponse } from 'ibm-watson/assistant/v2';
import { UseFilters } from '@nestjs/common';

import { WatsonAssistantService } from '../../shared/services/watson-assistant.service';
import { ChatInput } from './dto/chat.input';
import { ChatType } from './dto/chat.dto';
import { GraphqlExceptionFilter } from '../../shared/filters/graphql-exception.filter';

@Resolver('Chats')
@UseFilters(GraphqlExceptionFilter)
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
