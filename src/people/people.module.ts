import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { FileStorageService } from 'src/file-storage/file-storage.service';
import { ConfigService } from '@nestjs/config';
import { RandomKeyGeneratorService } from 'src/services/random-key-generator/random-key-generator.service';

@Module({
  controllers: [PeopleController],
  providers: [PeopleService, FileStorageService, ConfigService, RandomKeyGeneratorService]
})
export class PeopleModule {}
