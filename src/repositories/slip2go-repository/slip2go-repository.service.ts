import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import * as FormData from 'form-data';
import { Readable } from 'node:stream';
import { ApiPath } from 'src/types/api-path.enum';
import { ISlip2GoResponse } from './types/slip2go-response.type';

@Injectable()
export class Slip2goRepositoryService {
  private readonly axiosSlip2Go: AxiosInstance;

  constructor() {
    this.axiosSlip2Go = axios.create({
      baseURL: process.env.SLIP2GO_API_PREFIXY as string,
    });
  }

  async qrCode(qrCode: string) {
    const path = ApiPath.Slip2GoQrCode;

    const data = {
      payload: qrCode,
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SLIP2GO_AUTHORIZATION}`,
      },
    };

    const result = await this.axiosSlip2Go.post<ISlip2GoResponse>(
      path,
      data,
      config,
    );
    
    return result?.data;
  }

  async qrImage(binary: Readable) {
    const path = ApiPath.Slip2GoQrImage;

    const data = new FormData();
    data.append('file', binary);

    const config = {
      headers: {
        Authorization: `Bearer ${process.env.SLIP2GO_AUTHORIZATION}`,
      },
    };

    const result = await this.axiosSlip2Go.post<ISlip2GoResponse>(
      path,
      data,
      config,
    );

    return result?.data;
  }
}
