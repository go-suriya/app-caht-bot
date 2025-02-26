import { Injectable, OnModuleInit } from '@nestjs/common';
import Client, {
  RecordAuthResponse,
  RecordFullListOptions,
  RecordModel,
  RecordService,
} from 'pocketbase';
import { PocketBaseCollectionName } from 'src/types/pocketbase-collection.enum';

const PocketBase = require('pocketbase/cjs');

@Injectable()
export class PocketBaseRepositoryService implements OnModuleInit {
  private readonly pocketBase: Client;

  constructor() {
    this.pocketBase = new PocketBase(process.env.POCKETBASE_HOST);
  }

  async onModuleInit() {
    await this.authenticate();
  }

  collection(collection: PocketBaseCollectionName): RecordService<RecordModel> {
    return this.pocketBase.collection(collection);
  }

  async authenticate(): Promise<RecordAuthResponse<RecordModel>> {
    const usernameOrEmail = process.env.POCKETBASE_USERNAME as string;
    const password = process.env.POCKETBASE_PASSWORD as string;
    return await this.pocketBase.admins.authWithPassword(
      usernameOrEmail,
      password,
    );
  }

  async getAllRecords(
    collection: PocketBaseCollectionName,
  ): Promise<RecordModel[]> {
    return await this.pocketBase.collection(collection).getFullList();
  }

  async getRecordById(
    collection: PocketBaseCollectionName,
    id: string,
  ): Promise<RecordModel> {
    return await this.pocketBase.collection(collection).getOne(id);
  }

  async createRecord(collection: PocketBaseCollectionName, data: RecordModel) {
    return await this.pocketBase.collection(collection).create(data);
  }

  async updateRecord(
    collection: PocketBaseCollectionName,
    id: string,
    data: any,
  ) {
    return await this.pocketBase.collection(collection).update(id, data);
  }

  async deleteRecord(
    collection: PocketBaseCollectionName,
    id: string,
  ): Promise<boolean> {
    return await this.pocketBase.collection(collection).delete(id);
  }

  async getRecordsByFilter(
    collection: PocketBaseCollectionName,
    filter: RecordFullListOptions,
  ): Promise<RecordModel[]> {
    return await this.pocketBase.collection(collection).getFullList(filter);
  }

  async getRecordsByPage(
    collection: PocketBaseCollectionName,
    page: number,
    perPage: number,
  ): Promise<RecordModel[]> {
    const filter: RecordFullListOptions = {
      page: page,
      perPage: perPage,
    };
    return await this.pocketBase.collection(collection).getFullList(filter);
  }

  async getTotalRecordsCount(
    collection: PocketBaseCollectionName,
  ): Promise<number> {
    const records = await this.pocketBase.collection(collection).getFullList();
    return records.length;
  }

  async getTotalRecordsCountByFilter(
    collection: PocketBaseCollectionName,
    filter: RecordFullListOptions,
  ): Promise<number> {
    const records = await this.pocketBase
      .collection(collection)
      .getFullList(filter);
    return records.length;
  }

  async getRecordByField(
    collection: PocketBaseCollectionName,
    field: string,
    value: any,
  ): Promise<RecordModel[]> {
    const filter: RecordFullListOptions = {
      filter: `${field} = '${value}'`,
    };
    return await this.pocketBase.collection(collection).getFullList(filter);
  }

  async getRecordByFields(
    collection: PocketBaseCollectionName,
    filters: Record<string, any>,
  ): Promise<RecordModel[]> {
    const filterStr = Object.entries(filters)
      .map(([field, value]) => `${field} = '${value}'`)
      .join(' && ');
    const filter: RecordFullListOptions = {
      filter: filterStr,
    };
    return await this.pocketBase.collection(collection).getFullList(filter);
  }

  async getRecordByFieldWithPage(
    collection: PocketBaseCollectionName,
    field: string,
    value: any,
    page: number,
    perPage: number,
  ): Promise<RecordModel[]> {
    const filter: RecordFullListOptions = {
      filter: `${field} = '${value}'`,
      page: page,
      perPage: perPage,
    };
    return await this.pocketBase.collection(collection).getFullList(filter);
  }

  async getRecordsByFieldsWithPage(
    collection: PocketBaseCollectionName,
    filters: Record<string, any>,
    page: number,
    perPage: number,
  ): Promise<RecordModel[]> {
    const filterStr = Object.entries(filters)
      .map(([field, value]) => `${field} = '${value}'`)
      .join(' && ');
    const filter: RecordFullListOptions = {
      filter: filterStr,
      page: page,
      perPage: perPage,
    };
    return await this.pocketBase.collection(collection).getFullList(filter);
  }

  async getRecordsByFilterWithPage(
    collection: PocketBaseCollectionName,
    filter: RecordFullListOptions,
    page: number,
    perPage: number,
  ): Promise<RecordModel[]> {
    const newFilter = { ...filter, page, perPage };
    return await this.pocketBase.collection(collection).getFullList(newFilter);
  }

  async getRecordsByFilterWithCount(
    collection: PocketBaseCollectionName,
    filter: RecordFullListOptions,
  ): Promise<{ records: RecordModel[]; count: number }> {
    const records = await this.pocketBase
      .collection(collection)
      .getFullList(filter);
    const count = records.length;
    return { records, count };
  }

  async getRecordsByFilterWithPageAndCount(
    collection: PocketBaseCollectionName,
    filter: RecordFullListOptions,
    page: number,
    perPage: number,
  ): Promise<{ records: RecordModel[]; count: number }> {
    const newFilter = { ...filter, page, perPage };
    const records = await this.pocketBase
      .collection(collection)
      .getFullList(newFilter);
    const count = records.length;
    return { records, count };
  }
}
