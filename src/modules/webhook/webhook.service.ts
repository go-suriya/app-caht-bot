import { WebhookRequestBody } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { ReceivePaymentSlipUsecaseService } from 'src/usecases/slip/receive-payment-slip-usecase/receive-payment-slip-usecase.service';
import { CreateSlipGroupUsecaseService } from '../../usecases/slip-group/create-slip-group-usecase/create-slip-group-usecase.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly receivePaymentSlipUsecaseService: ReceivePaymentSlipUsecaseService,
    private readonly createSlipGroupUsecaseService: CreateSlipGroupUsecaseService,
  ) {}

  async handleWebhook(body: WebhookRequestBody) {
    if (!body || !body?.events) {
      return 'Invalid webhook request';
    }

    const events = body.events;

    for (const event of events) {
      console.log('event =>', event);

      const userId = event.source?.userId as string;

      switch (event?.type) {
        case 'message':
          const eventMessage = event?.message;
          if (eventMessage?.type === 'image') {
            await this.receivePaymentSlipUsecaseService.execute(
              userId,
              eventMessage,
              event,
            );
          }
          break;
        case 'join':
          if (event.source?.type === 'group') {
            await this.createSlipGroupUsecaseService.execute(
              event?.source?.groupId,
            );
          }

          break;
        case 'leave':

        default:
          break;
      }
    }
  }
}
