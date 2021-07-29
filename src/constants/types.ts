export interface Wallet {
    id:number,
    uuid: string;
    privateKey: string;
    mnemonic: string;
  }
export interface User {
    id:number,
    uuid: string;
    uname: string;
    email: string;
    passwd: string;
}