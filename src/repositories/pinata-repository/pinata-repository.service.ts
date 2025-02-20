import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as FormData from 'form-data';

@Injectable()
export class PinataRepositoryService {
  private readonly axiosPinata: AxiosInstance;

  constructor() {
    this.axiosPinata = axios.create({
      baseURL: 'https://uploads.pinata.cloud' as string,
    });
  }

  async upload(binary: any) {
    const file = new File(['Hello World!'], 'hello.txt');

    const path = '/pinFileToIPFS';

    const data = new FormData();
    data.append('file', file);

    const config = {
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    };

    const result = await this.axiosPinata.post<any>('/v3/files', data, config);

    return result?.data;
  }
}
