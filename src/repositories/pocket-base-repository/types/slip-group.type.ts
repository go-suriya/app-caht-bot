import {
  Collection,
  RecordModel,
} from 'src/types/pocketbase-record-model.type';

export interface SlipGroup extends Collection {
  line_group_id: string;
  group_name: string;
}

export interface SlipGroupRecord extends SlipGroup, RecordModel {}
