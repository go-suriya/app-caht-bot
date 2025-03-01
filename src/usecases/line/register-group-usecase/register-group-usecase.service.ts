import { Injectable } from '@nestjs/common';
import { LineRepositoryService } from 'src/repositories/line-repository/line-repository.service';
import { PocketBaseRepositoryService } from 'src/repositories/pocket-base-repository/pocket-base-repository.service';
import { PocketBaseCollectionName } from 'src/types/pocketbase-collection.enum';

@Injectable()
export class RegisterGroupUsecaseService {
  constructor(
    private readonly pocketBaseRepositoryService: PocketBaseRepositoryService,
    private readonly lineRepositoryService: LineRepositoryService,
  ) {}

  async execute(groupId: string, replyToken: string, textMessage: string) {
    const replaceGroupTypeName = textMessage.replace('#ลงทะเบียน', '').trim();

    const getGroupTypeName =
      await this.pocketBaseRepositoryService.getFirstListItem(
        PocketBaseCollectionName.GroupTypes,
        `group_type_name="${replaceGroupTypeName}"`,
      );

    if (!getGroupTypeName) {
      const textMessage = await this.handelTextGroupType();
      await this.lineRepositoryService.getClient().replyMessage(replyToken, {
        type: 'text',
        text: textMessage,
      });
      return;
    }

    const prepareGroup =
      await this.pocketBaseRepositoryService.getFirstListItem(
        PocketBaseCollectionName.Groups,
        `line_group_id="${groupId}"`,
        {
          expand: 'group_type_id',
        },
      );

    const groupTypeName: string =
      prepareGroup?.expand?.group_type_id?.group_type_name;

    if (groupTypeName) {
      await this.lineRepositoryService.getClient().replyMessage(replyToken, {
        type: 'text',
        text: `ไม่สามารถลงทะเบียนได้ มีการลงทะเบียนกลุ่ม ${groupTypeName} ในระบบแล้ว`,
      });
      return;
    }

    await this.updateGroup(
      replaceGroupTypeName,
      replyToken,
      prepareGroup?.id as string,
    );
  }

  private async updateGroup(
    groupTypeName: string,
    replyToken: string,
    groupId: string,
  ) {
    const prepareGroupType =
      await this.pocketBaseRepositoryService.getFirstListItem(
        PocketBaseCollectionName.GroupTypes,
        `group_type_name="${groupTypeName}"`,
      );

    if (!prepareGroupType) {
      await this.lineRepositoryService.getClient().replyMessage(replyToken, {
        type: 'text',
        text: `ไม่พบข้อมูลกลุ่ม`,
      });
      return;
    }

    const groupTypeId = prepareGroupType?.id as string;

    const data = {
      group_type_id: groupTypeId,
    };

    await this.pocketBaseRepositoryService
      .collection(PocketBaseCollectionName.Groups)
      .update(groupId, data);

    await this.lineRepositoryService.getClient().replyMessage(replyToken, {
      type: 'text',
      text: `ตั้งค่ากลุ่มเป็น: ${groupTypeName} เสร็จเรียบร้อยแล้ว`,
    });
  }

  private async handelTextGroupType() {
    const groupTypes = await this.pocketBaseRepositoryService
      .collection(PocketBaseCollectionName.GroupTypes)
      .getFullList();

    if (!groupTypes?.length) {
      return 'ไม่พบข้อมูลกลุ่ม';
    }

    const text = 'ประเภทกลุ่มไม่ถูกต้อง กรุณาใช้';
    const options = groupTypes?.map(
      (group) => `#ลงทะเบียน${group?.group_type_name}`,
    );
    const result = `${text} ${options.join(' หรือ ')}`;
    return result;
  }
}
