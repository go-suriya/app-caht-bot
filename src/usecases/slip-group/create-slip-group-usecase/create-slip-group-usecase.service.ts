import { Injectable } from '@nestjs/common';
import { LineRepositoryService } from 'src/repositories/line-repository/line-repository.service';
import { TypeGroup } from 'src/types/type-group.enum';
import { SlipGroupEntity } from '../../../database/entities/slip/SlipGroupEntity';
import { SlipGroupRepositoryService } from '../../../repositories/slip-group-repository/slip-group-repository.service';

@Injectable()
export class CreateSlipGroupUsecaseService {
  constructor(
    private readonly slipGroupRepositoryService: SlipGroupRepositoryService,
    private readonly lineRepositoryService: LineRepositoryService,
  ) {}

  async execute(groupId: string) {
    if (!groupId) return;

    const prepareSlipGroup = await this.slipGroupRepositoryService.findOne({
      where: {
        line_group_id: groupId,
      },
    });

    if (prepareSlipGroup) return;

    const prepareGroupSummary = await this.lineRepositoryService
      .getClient()
      .getGroupSummary(groupId);

    const slipGroup = new SlipGroupEntity();
    slipGroup.line_group_id = groupId;
    slipGroup.group_name = prepareGroupSummary?.groupName;
    slipGroup.type = TypeGroup.Join;

    const newSlipGroup =
      await this.slipGroupRepositoryService.create(slipGroup);

    return newSlipGroup;
  }
}
