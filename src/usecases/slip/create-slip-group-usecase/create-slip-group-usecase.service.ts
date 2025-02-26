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

  async execute(groupId: string) {
    console.log('Creating slip group...');

    if (!groupId) return;

    const prepareSlipGroup =
      await this.pocketBaseRepositoryService.getRecordByField(
        PocketBaseCollectionName.SlipGroup,
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

    const newSlipGroup = await this.pocketBaseRepositoryService
      .collection(PocketBaseCollectionName.SlipGroup)
      .create(data, { $autoCancel: true });

    console.log('New slip group:', newSlipGroup);
  }
}
