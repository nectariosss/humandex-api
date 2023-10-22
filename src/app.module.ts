import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './people/people.module';
import { TagsModule } from './tags/tags.module';
import { FileStorageService } from './file-storage/file-storage.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RandomKeyGeneratorService } from './services/random-key-generator/random-key-generator.service';


@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: ['.env.local', '.env'],
        isGlobal: true,
      }
    ), PeopleModule, TagsModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
