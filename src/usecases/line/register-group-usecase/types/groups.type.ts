export type IGroups = Groups[];

export interface Groups {
  collectionId: string;
  collectionName: string;
  created: string;
  expand: Expand;
  group_name: string;
  group_type_id: string;
  id: string;
  line_group_id: string;
  updated: string;
}

export interface Expand {
  group_type_id: GroupTypeId;
}

export interface GroupTypeId {
  collectionId: string;
  collectionName: string;
  created: string;
  group_type_name: string;
  id: string;
  updated: string;
}
