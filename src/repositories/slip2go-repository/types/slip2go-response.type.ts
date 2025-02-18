export interface ISlip2GoResponse {
  code: string;
  message: string;
  data?: Data;
}

export interface Data {
  id: string;
  decode: string;
  transRef: string;
  dateTime: string;
  amount: number;
  ref1: string;
  ref2: string;
  ref3: string;
  receiver: Receiver;
  sender: Sender;
}

export interface Receiver {
  account: Account;
  bank: Bank2;
}

export interface Account {
  name: string;
  bank: Bank;
  proxy: Proxy;
}

export interface Bank {
  account: string;
}

export interface Proxy {
  type: string;
  account: string;
}

export interface Bank2 {
  id: string;
  name: string;
}

export interface Sender {
  account: Account2;
  bank: Bank4;
}

export interface Account2 {
  name: string;
  bank: Bank3;
}

export interface Bank3 {
  account: string;
}

export interface Bank4 {
  id: string;
  name: string;
}
