import { WebhookRequestBody } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { LineRepositoryService } from 'src/repositories/line-repository/line-repository.service';
import { ReceivePaymentSlipUsecaseService } from 'src/usecases/slip/receive-payment-slip-usecase/receive-payment-slip-usecase.service';
import { CreateSlipGroupUsecaseService } from '../../usecases/slip-group/create-slip-group-usecase/create-slip-group-usecase.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly receivePaymentSlipUsecaseService: ReceivePaymentSlipUsecaseService,
    private readonly createSlipGroupUsecaseService: CreateSlipGroupUsecaseService,
    private readonly lineRepositoryService: LineRepositoryService,
  ) {}

  async loading(userId: string) {
    try {
      await axios({
        method: 'post',
        url: 'https://api.line.me/v2/bot/chat/loading/start',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
        },
        data: { chatId: userId },
      });
      return true;
    } catch (error) {
      console.error('LINE API Error:', error.response?.data || error.message);
      throw error;
    }
  }

  async handleWebhook(body: WebhookRequestBody) {
    if (!body || !body?.events) {
      return 'Invalid webhook request';
    }

    const events = body.events;

    for (const event of events) {
      console.log('event =>', event);

      const userId = event?.source?.userId as string;

      if (userId) {
        await this.lineRepositoryService.loading(userId);
      }

      switch (event?.type) {
        case 'message':
          const eventMessage = event?.message;
          if (eventMessage?.type === 'image') {
            const messageId = event?.message?.id;
            const replyToken = event.replyToken;
            await this.receivePaymentSlipUsecaseService.execute(
              messageId,
              replyToken,
              userId,
            );
          }
          break;
        case 'join':
          if (event.source?.type === 'group') {
            const groupId = event.source.groupId;
            await this.createSlipGroupUsecaseService.execute(groupId);
          }

          break;
        case 'leave':

        default:
          break;
      }
    }
  }
}
