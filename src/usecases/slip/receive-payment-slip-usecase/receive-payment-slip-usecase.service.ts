import * as Types from '@line/bot-sdk/lib/types';
import { Injectable } from '@nestjs/common';
import { LineRepositoryService } from 'src/repositories/line-repository/line-repository.service';
import { PocketBaseRepositoryService } from 'src/repositories/pocket-base-repository/pocket-base-repository.service';
import { Slip2goRepositoryService } from 'src/repositories/slip2go-repository/slip2go-repository.service';
import { PocketBaseCollectionName } from 'src/types/pocketbase-collection.enum';
import { Slip2GoResponseSuccessCode } from 'src/types/slip2go-response-code.enum';
import { streamToBuffer } from 'src/utils/stream-to-buffer.utils';

@Injectable()
export class ReceivePaymentSlipUsecaseService {
  constructor(
    private readonly lineRepositoryService: LineRepositoryService,
    private readonly slip2goRepositoryService: Slip2goRepositoryService,
    private readonly pocketBaseRepositoryService: PocketBaseRepositoryService,
  ) {}

  async execute(messageId: string, replyToken: string, userId: string) {
    // Handle image message
    const client = this.lineRepositoryService.getClient();
    const binaryToSlip = await client.getMessageContent(messageId);

    // Process QR Image
    const slipResponse =
      await this.slip2goRepositoryService.qrImage(binaryToSlip);
    console.log('slipResponse  =>', slipResponse);

    const code = slipResponse?.code as Slip2GoResponseSuccessCode;

    if (
      code !== Slip2GoResponseSuccessCode.SUCCESS &&
      code !== Slip2GoResponseSuccessCode.INVALID_RECIPIENT_ACCOUNT
    ) {
      // Send failure message
      await client.replyMessage(replyToken, {
        type: 'text',
        text: this.getSuccessMessage(code),
      });
      return;
    }

    console.log('Processing valid slip...');

    const prepareUser = await client.getProfile(userId);
    const prepareImageUrl = await this.saveSlipFile(messageId);
    const responseData = {
      lineName: prepareUser?.displayName,
      senderAccountName: slipResponse.data?.sender?.account?.name,
      amount: slipResponse.data?.amount,
      imageUrl: prepareImageUrl,
    };

    // Construct message
    const messages: Types.Message | Types.Message[] = [
      {
        type: 'text',
        text: `ชื่อไลน์ : ${responseData.lineName}\nชื่อบัญชีผู้ส่ง : ${responseData.senderAccountName}\nจำนวนเงิน : ${responseData.amount} บาท`,
      },
      {
        type: 'image',
        originalContentUrl: responseData.imageUrl,
        previewImageUrl: responseData.imageUrl,
      },
    ];

    // Send response
    await client.replyMessage(replyToken, messages);
  }

  private async saveSlipFile(messageId: string) {
    const prepareMessageContent = await this.lineRepositoryService
      .getClient()
      .getMessageContent(messageId);
    const buffer = await streamToBuffer(prepareMessageContent);

    const data = new FormData();
    data.append('file', new Blob([buffer]));

    // Save slip to pocketbase
    const newSlipFile = await this.pocketBaseRepositoryService
      .collection(PocketBaseCollectionName.SlipFile)
      .create(data, { $autoCancel: true });

    const imageUrl = `${process.env.POCKETBASE_HOST}/api/files/${newSlipFile.collectionId}/${newSlipFile.id}/${newSlipFile.file}?thumb=1024x1024`;

    return imageUrl;
  }

  private getSuccessMessage(code: Slip2GoResponseSuccessCode) {
    const messages: Record<Slip2GoResponseSuccessCode, string> = {
      [Slip2GoResponseSuccessCode.SUCCESS]: 'สำเร็จ',
      [Slip2GoResponseSuccessCode.CANNOT_VERIFY_RECEIPT]:
        'ไม่สามารถตรวจสอบสลิปได้',
      [Slip2GoResponseSuccessCode.RECEIPT_NOT_FOUND]: 'ไม่พบสลิป',
      [Slip2GoResponseSuccessCode.INVALID_QR_CODE]: 'QR Code ไม่ถูกต้อง',
      [Slip2GoResponseSuccessCode.INVALID_RECIPIENT_ACCOUNT]:
        'บัญชีผู้รับไม่ตรงในระบบ',
      [Slip2GoResponseSuccessCode.DUPLICATE_RECEIPT]: 'สลิปซ้ำ',
      [Slip2GoResponseSuccessCode.INCORRECT_RECEIPT_INFO]:
        'ข้อมูลสลิปไม่ถูกต้อง',
    };

    return messages[code] || 'ไม่ทราบสถานะ';
  }

  /*private async handleUserProfile(event: WebhookEvent): Promise<void> {
    // Handle user profile
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
  }*/
}
