import { WebhookRequestBody } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { LineRepositoryService } from 'src/repositories/line-repository/line-repository.service';
import { CreateSlipGroupUsecaseService } from 'src/usecases/slip/create-slip-group-usecase/create-slip-group-usecase.service';
import { ReceivePaymentSlipUsecaseService } from 'src/usecases/slip/receive-payment-slip-usecase/receive-payment-slip-usecase.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly receivePaymentSlipUsecaseService: ReceivePaymentSlipUsecaseService,
    private readonly createSlipGroupUsecaseService: CreateSlipGroupUsecaseService,
    private readonly lineRepositoryService: LineRepositoryService,
  ) {}

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
            const replyToken = event?.replyToken;
            await this.receivePaymentSlipUsecaseService.execute(
              messageId,
              replyToken,
              userId,
            );
          }
          break;
        case 'join':
          if (event?.source?.type === 'group') {
            const groupId = event.source?.groupId;
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
