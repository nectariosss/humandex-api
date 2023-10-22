import { Injectable } from '@nestjs/common';
import { FileStorageService } from './file-storage/file-storage.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
