import { EventMessage, WebhookEvent } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { SlipUserEntity } from 'src/database/entities/slip/SlipUserEntity';
import { LineRepositoryService } from 'src/repositories/line-repository/line-repository.service';
import { SlipUserRepositoryService } from 'src/repositories/slip-user-repository/slip-user-repository.service';
import { Slip2goRepositoryService } from 'src/repositories/slip2go-repository/slip2go-repository.service';

@Injectable()
export class ReceivePaymentSlipUsecaseService {
  constructor(
    private readonly lineRepositoryService: LineRepositoryService,
    private readonly slipUserRepositoryService: SlipUserRepositoryService,
    private readonly slip2goRepositoryService: Slip2goRepositoryService,
  ) {}

  async execute(messages: EventMessage, event: WebhookEvent) {
    // Handle user profile
    await this.handleUserProfile(event);

    // Handle image message
    const binary = await this.lineRepositoryService
      .getClient()
      .getMessageContent(messages.id);

    const res = await this.slip2goRepositoryService.qrImage(binary);
    console.log('res =>', JSON.stringify(res));
  }

  private async handleUserProfile(event: WebhookEvent): Promise<void> {
    if (event.source?.type !== 'group') return;

    const { userId, groupId } = event?.source ?? {};
    if (!userId || !groupId) return;

    // Check if user already exists
    const user = await this.slipUserRepositoryService.findOne({
      where: { line_user_id: userId, line_group_id: groupId },
    });
    if (user) return;

    // Fetch user profile
    const prepareUser = await this.lineRepositoryService
      .getClient()
      .getProfile(userId);

    const displayName = prepareUser?.displayName;

    // Create and save new user
    const slipUser = new SlipUserEntity();
    slipUser.line_user_id = userId;
    slipUser.line_group_id = groupId;
    slipUser.display_name = displayName;
    slipUser.created_by = displayName;

    await this.slipUserRepositoryService.create(slipUser);
  }
}
