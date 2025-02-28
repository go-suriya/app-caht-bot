import { Injectable } from '@nestjs/common';
import { LineRepositoryService } from 'src/repositories/line-repository/line-repository.service';
import { PocketBaseRepositoryService } from 'src/repositories/pocket-base-repository/pocket-base-repository.service';
import { PocketBaseCollectionName } from 'src/types/pocketbase-collection.enum';

@Injectable()
export class CreateSlipGroupUsecaseService {
  constructor(
    private readonly pocketBaseRepositoryService: PocketBaseRepositoryService,
    private readonly lineRepositoryService: LineRepositoryService,
  ) {}

  async execute(groupId: string, replyToken: string) {
    console.log('Creating slip group...');

    if (!groupId) return;

    const prepareSlipGroup =
      await this.pocketBaseRepositoryService.getRecordByField(
        PocketBaseCollectionName.Groups,
        'line_group_id',
        groupId,
      );

    if (prepareSlipGroup?.length) {
      console.log('Slip group already exists:', prepareSlipGroup);
      return;
    }

    const { groupName } = await this.lineRepositoryService
      .getClient()
      .getGroupSummary(groupId);

    const data = {
      line_group_id: groupId,
      group_name: groupName,
    };

    await this.pocketBaseRepositoryService
      .collection(PocketBaseCollectionName.Groups)
      .create(data, { $autoCancel: true });

    const textMessage = await this.handelTextGroupType();

    await this.lineRepositoryService.getClient().replyMessage(replyToken, [
      {
        type: 'text',
        text: textMessage,
      },
    ]);
  }

  private async handelTextGroupType() {
    const groupTypes = await this.pocketBaseRepositoryService
      .collection(PocketBaseCollectionName.GroupTypes)
      .getFullList();

    if (!groupTypes?.length) {
      return 'ไม่พบข้อมูลกลุ่ม';
    }

    const text = 'โปรดตั้งค่ากลุ่มของคุณ:';
    const options = groupTypes?.map(
      (group) => `#ลงทะเบียน${group?.group_type_name}`,
    );
    const result = `${text} ${options.join(' หรือ ')}`;
    return result;
  }
}
