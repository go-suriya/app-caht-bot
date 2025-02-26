export enum PocketBaseCollectionName {
  Users = 'users',
  SlipFile = 'slip_file',
  SlipGroup = 'slip_group',
}

export class Collection {
  id?: string;
  created?: string;
  updated?: string;
}

export class Record {
  collectionId?: string;
  collectionName?: string;
  expand?: {
    [key: string]: Record | Array<Record>;
  };
}

export interface ListRecord<T> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T;
}
