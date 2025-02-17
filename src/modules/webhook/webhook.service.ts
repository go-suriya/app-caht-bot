import { EventMessage, WebhookRequestBody } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import {
  ReceivePaymentSlipUsecaseService,
} from 'src/usecases/slip/receive-payment-slip-usecase/receive-payment-slip-usecase.service';
import {
  CreateSlipGroupUsecaseService,
} from '../../usecases/slip-group/create-slip-group-usecase/create-slip-group-usecase.service';
import { EventSource, Group } from '@line/bot-sdk/lib/types';

@Injectable()
export class WebhookService {
  constructor(
    private readonly receivePaymentSlipUsecaseService: ReceivePaymentSlipUsecaseService,
    private readonly createSlipGroupUsecaseService: CreateSlipGroupUsecaseService,
  ) {
  }

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
            );
          }
          break;
        case 'join':
          if (event.source.type === 'group') {
            await this.createSlipGroupUsecaseService.execute(event.source.groupId);
          }
          const e = {
            type: 'join',
            webhookEventId: '01JM9FMS634ZQ7KN4ZE351A6H8',
            deliveryContext: { isRedelivery: false },
            timestamp: 1739780154108,
            source: { type: 'group', groupId: 'Ca288e43a2c56d2fe273a6137b4346b4c' },
            replyToken: 'a176f5f8400f4e5b9bd2bd0f5e97e954',
            mode: 'active',
          };

          const l = {
            type: 'leave',
            webhookEventId: '01JM9H3RA8PQ7HV5M87TF89JFN',
            deliveryContext: { isRedelivery: false },
            timestamp: 1739781693694,
            source: { type: 'group', groupId: 'Ca288e43a2c56d2fe273a6137b4346b4c' },
            mode: 'active',
          };

          break;

        default:
          break;
      }
    }
  }
}
