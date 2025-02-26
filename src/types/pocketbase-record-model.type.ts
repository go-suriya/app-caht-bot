
export class RecordModel {
  collectionId?: string;
  collectionName?: string;
  expand?: {
    [key: string]: any;
  };
}

export class Collection {
  id?: string;
  created?: string;
  updated?: string;
}
