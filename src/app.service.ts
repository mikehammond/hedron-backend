import { Injectable } from '@nestjs/common';

export type Hello = {
  host: string;
  msg: string;
}

@Injectable()
export class AppService {
  getHello(): Hello {
    return {
      host: 'localhost',
      msg: 'Hello World!'
    };
  }
}
