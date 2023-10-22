import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RandomKeyGeneratorService {
  constructor() {}

  generateRandomKey() {
    const uniqueId = uuidv4();
    return uniqueId;
  }
}
