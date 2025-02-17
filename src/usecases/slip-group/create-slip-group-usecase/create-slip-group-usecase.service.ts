import { Injectable } from '@nestjs/common';
import { SlipGroupRepositoryService } from '../../../repositories/slip-group-repository/slip-group-repository.service';
import { SlipGroupEntity } from '../../../database/entities/slip/SlipGroupEntity';

@Injectable()
export class CreateSlipGroupUsecaseService {
  constructor(
    private readonly slipGroupRepositoryService: SlipGroupRepositoryService,
  ) {
  }

  async execute(groupId: string) {
    if (!groupId) return;

    const prepareSlipGroup = await this.slipGroupRepositoryService.findOne({
      where: {
        line_group_id: groupId,
      },
    });

    if (prepareSlipGroup) return;

    const slipGroup = new SlipGroupEntity();
    slipGroup.line_group_id = groupId;

    const newSlipGroup = await this.slipGroupRepositoryService.create(slipGroup);
    return newSlipGroup;
  }
}
