import { EventMessage, WebhookRequestBody } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { ReceivePaymentSlipUsecaseService } from 'src/usecases/slip/receive-payment-slip-usecase/receive-payment-slip-usecase.service';

@Injectable()
export class WebhookService {
  constructor(
    private readonly receivePaymentSlipUsecaseService: ReceivePaymentSlipUsecaseService,
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
            );
          }
          break;

        default:
          break;
      }
    }
  }

  private async handleImageMessage(userId: string, messages: EventMessage) {
    // Handle image message
    // const binary = await this.lineRepositoryService
    //   .getClient()
    //   .getMessageContent(messages.id);
  }
}
