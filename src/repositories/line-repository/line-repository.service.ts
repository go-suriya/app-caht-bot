import { Client } from '@line/bot-sdk';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { ApiPath } from 'src/types/api-path.enum';

@Injectable()
export class LineRepositoryService {
  private readonly axiosLine: AxiosInstance;
  private readonly client: Client;

  constructor() {
    this.axiosLine = axios.create({
      baseURL: process.env.MESSAGING_API_PREFIX as string,
    });
    const config = {
      channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN as string,
      channelSecret: process.env.CHANNEL_SECRET as string,
    };
    this.client = new Client(config);
  }

  getClient(): Client {
    return this.client;
  }

  async loading(userId: string) {
    const path = ApiPath.ChatLoadingStart;
    const data = {
      chatId: userId,
      loadingSeconds: 30,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
      },
    };
    await this.axiosLine.post(path, data, config);
  }
}
