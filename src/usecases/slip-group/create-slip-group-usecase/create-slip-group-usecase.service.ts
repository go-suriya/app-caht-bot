import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateSlipGroupUsecaseService {
  // constructor(
  //   private readonly slipGroupRepositoryService: SlipGroupRepositoryService,
  //   private readonly lineRepositoryService: LineRepositoryService,
  // ) {}

  // async execute(groupId: string) {
  //   if (!groupId) return;

  //   const prepareSlipGroup = await this.slipGroupRepositoryService.findOne({
  //     where: {
  //       line_group_id: groupId,
  //     },
  //   });

  //   if (prepareSlipGroup) return;

  //   const prepareGroupSummary = await this.lineRepositoryService
  //     .getClient()
  //     .getGroupSummary(groupId);

  //   const slipGroup = new SlipGroupEntity();
  //   slipGroup.line_group_id = groupId;
  //   slipGroup.group_name = prepareGroupSummary?.groupName;
  //   slipGroup.type = TypeGroup.Join;

  //   const newSlipGroup =
  //     await this.slipGroupRepositoryService.create(slipGroup);

  //   return newSlipGroup;
  // }
}
