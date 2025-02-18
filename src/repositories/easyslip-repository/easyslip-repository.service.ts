import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as FormData from 'form-data';
import { Readable } from 'node:stream';
import { ApiPath } from 'src/types/api-path.enum';
import { IEasySlipResponse } from './types/easyslip-response.type';

@Injectable()
export class EasyslipRepositoryService {
  private readonly axiosEasySlip: AxiosInstance;

  constructor() {
    this.axiosEasySlip = axios.create({
      baseURL: process.env.EASYSLIP_API_PREFIXY as string,
    });
  }

  async verifySlip(binary: Readable) {
    const path = ApiPath.EasySlipVerify;

    const headers = {
      headers: {
        Authorization: `Bearer ${process.env.EASYSLIP_AUTHORIZATION}`,
      },
    };

    const data = new FormData();
    data.append('file', binary);

    const result = await this.axiosEasySlip.post<IEasySlipResponse>(
      path,
      data,
      headers,
    );

    return result?.data;
  }
}
