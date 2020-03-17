import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import * as AssistantV2 from 'ibm-watson/assistant/v2';
import { IamAuthenticator } from 'ibm-watson/auth';

import { ChatInput } from "../../graphql/chats/dto/chat.input";

@Injectable()
export class WatsonAssistantService {
  private assistantV2: AssistantV2;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.assistantV2 = new AssistantV2({
      version: '2020-02-05',
      authenticator: new IamAuthenticator({
        apikey: this.configService.get<string>('WATSON_ASSISTANT_API_KEY')
      }),
      serviceUrl: this.configService.get<string>('WATSON_ASSISTANT_SERVICE_URL')
    });
  }

  private async createSession() {
    const response = await this.assistantV2.createSession({
      assistantId: this.configService.get<string>('WATSON_ASSISTANT_ID'),
    });

    return response.result.session_id;
  }

  private message(sessionId: string, message: string) {
    return this.assistantV2.message({
      assistantId: this.configService.get<string>('WATSON_ASSISTANT_ID'),
      sessionId: sessionId,
      input: {
        message_type: 'text',
        text: message
      }
    })
  }

  async askQuestion(chat: ChatInput) {
    let sessionId = chat.sessionId;
    if (!sessionId) {
      sessionId = await this.createSession();
    }

    try {
      const response = await this.message(sessionId, chat.message);
      return { sessionId, ...response.result };
    } catch (error) {
      sessionId = await this.createSession();
      const response = await this.message(sessionId, chat.message);
      return { sessionId, ...response.result };
    }
  }
}