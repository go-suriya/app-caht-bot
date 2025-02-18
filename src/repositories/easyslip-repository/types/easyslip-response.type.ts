export interface IEasySlipResponse {
  status: number;
  data?: Data;
}

export interface Data {
  payload: string;
  transRef: string;
  date: string;
  countryCode: string;
  amount: Amount;
  fee: number;
  ref1: string;
  ref2: string;
  ref3: string;
  sender: Sender;
  receiver: Receiver;
}

export interface Amount {
  amount: number;
  local: Local;
}

export interface Local {
  amount: number;
  currency: string;
}

export interface Sender {
  bank: Bank;
  account: Account;
}

export interface Bank {
  id: string;
  name: string;
  short: string;
}

export interface Account {
  name: Name;
  bank: Bank2;
}

export interface Name {
  th: string;
}

export interface Bank2 {
  type: string;
  account: string;
}

export interface Receiver {
  bank: Bank3;
  account: Account2;
}

export interface Bank3 {
  id: string;
  name: string;
  short: string;
}

export interface Account2 {
  name: Name2;
  bank: Bank4;
}

export interface Name2 {
  th: string;
}

export interface Bank4 {
  type: string;
  account: string;
}
