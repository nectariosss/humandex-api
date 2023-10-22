import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { FileStorageService } from 'src/file-storage/file-storage.service';
import { ConfigService } from '@nestjs/config';
import { RandomKeyGeneratorService } from 'src/services/random-key-generator/random-key-generator.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService, FileStorageService, ConfigService, RandomKeyGeneratorService]
})
export class TagsModule {}
