import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class SlipokRepositoryService {
  private readonly axiosSlipOk: AxiosInstance;

  constructor() {
    this.axiosSlipOk = axios.create({
      baseURL: process.env.SLIPOK_API_PREFIX as string,
    });
  }
  
}
