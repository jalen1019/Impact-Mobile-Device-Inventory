import { User } from './user';

export class Device {
  id: number;
  user: User;
  model: string;
  iccid: number;
  imei: number;
  serial: string;
  ugpradeDate: string;
  company: string;
  notes: string;
  previousUsers: User[] = [];
};