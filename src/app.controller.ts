import { Client, WebhookRequestBody } from '@line/bot-sdk';
import { Body, Controller, Post } from '@nestjs/common';
import axios from 'axios';
import { LineRepositoryService } from './repositories/line-repository/line-repository.service';

@Controller('bak-webhook')
export class AppController {
  private client: Client;
  private readonly apiUrl = 'https://api.line.me/v2/bot/chat/loading/start';
  private readonly accessToken =
    'QRIJSZgDAb8XzIqY0u4uDLcfjOD1G1wlzZitVJo31RZbayC8ZP15i5AT2oE+QkQaEb/6NBYlGE+2hkTe9ORNJW2AnDynXBePl0GiZpLSZckBQvfAR3BYdmFIUbpblzKU7ZwwF8LtcP2JzWMQCvBXuAdB04t89/1O/w1cDnyilFU=';

  constructor(private readonly lineRepositoryService: LineRepositoryService) {
    const config = {
      channelAccessToken:
        'QRIJSZgDAb8XzIqY0u4uDLcfjOD1G1wlzZitVJo31RZbayC8ZP15i5AT2oE+QkQaEb/6NBYlGE+2hkTe9ORNJW2AnDynXBePl0GiZpLSZckBQvfAR3BYdmFIUbpblzKU7ZwwF8LtcP2JzWMQCvBXuAdB04t89/1O/w1cDnyilFU=' as string,
      channelSecret: '0be66dbeb9cb31a29d9e5c69e002f648' as string,
    };
    this.client = new Client(config);
  }

  @Post()
  async handleWebhook(@Body() body: WebhookRequestBody) {
    if (!body || !body.events) {
      return 'Invalid webhook request';
    }

    const events = body.events;

    for (const event of events) {
      const userId = event.source.userId as string;
      await this.loading(userId);
      console.log('event =>', event);

      await this.sendMessage(userId, 'Hello from NestJS!');

      if (event.type === 'message' && event.message.type === 'image') {
        const binary = await this.lineRepositoryService
          .getClient()
          .getMessageContent(event.message.id);
        console.log('binary =>', binary);
      }
    }
  }

  async loading(userId) {
    await axios({
      method: 'post',
      url: 'https://api.line.me/v2/bot/chat/loading/start',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
      },
      data: { chatId: userId, loadingSeconds: 30 },
    });
  }

  async sendMessage(userId: string, message: string) {
    return this.lineRepositoryService
      .getClient()
      .pushMessage(userId, { type: 'text', text: message });
  }
}
