import { EventMessage } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import { SlipUserEntity } from 'src/database/entities/slip/SlipUserEntity';
import { LineRepositoryService } from 'src/repositories/line-repository/line-repository.service';
import { SlipUserRepositoryService } from 'src/repositories/slip-user-repository/slip-user-repository.service';

@Injectable()
export class ReceivePaymentSlipUsecaseService {
  constructor(
    private readonly lineRepositoryService: LineRepositoryService,
    private readonly slipUserRepositoryService: SlipUserRepositoryService,
  ) {}

  async execute(userId: string, messages: EventMessage) {
    // Handle user profile
    await this.handleUserProfile(userId);

    // Handle image message
    // const binary = await this.lineRepositoryService
    //   .getClient()
    //   .getMessageContent(messages.id);
  }

  private async handleUserProfile(userId: string): Promise<void> {
    if (!userId) return;

    const user = await this.slipUserRepositoryService.findOne({
      where: { line_user_id: userId },
    });

    if (user) return;

    const prepareUser = await this.lineRepositoryService
      .getClient()
      .getProfile(userId);

    if (!prepareUser) return;

    const displayName = prepareUser?.displayName;

    const slipUser = new SlipUserEntity();
    slipUser.line_user_id = userId;
    slipUser.display_name = displayName;
    slipUser.created_by = displayName;

    await this.slipUserRepositoryService.create(slipUser);
  }
}
