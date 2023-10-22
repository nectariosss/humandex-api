import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto, DeleteTagDto, Tag, TagDto, UpdateTagDto } from './dto/tags';
import { ConfigService } from '@nestjs/config';

@Controller('tags')
export class TagsController {
  constructor(
    private _configService: ConfigService,
    private _tagsService: TagsService) {}

  @Get('list')
  getTags(@Request() req): Promise<TagDto[]> {
    if (req.headers.authorization !== this._configService.get<string>('PASSWORD')) {
      throw new Error('Unauthorized');
    }
    return this._tagsService.getTags();
  }

  @Post('create')
  createTag( @Request() req, @Body() tag: CreateTagDto):Promise<TagDto> {
    if (req.headers.authorization !== this._configService.get<string>('PASSWORD')) {
      throw new Error('Unauthorized');
    }
    return this._tagsService.createTag(tag);
  }

  @Post('update')
  updateTag( @Request() req, @Body() tag: UpdateTagDto): Promise<TagDto> {
    if (req.headers.authorization !== this._configService.get<string>('PASSWORD')) {
      throw new Error('Unauthorized');
    }
    return this._tagsService.updateTag(tag);
  }

  @Post('delete')
  deleteTag( @Request() req, @Body() tag: DeleteTagDto):Promise<any> {
    if (req.headers.authorization !== this._configService.get<string>('PASSWORD')) {
      throw new Error('Unauthorized');
    }
    return this._tagsService.deleteTag(tag);
  }

  //the following method is commented out to prevent accidental execution
  // @Get('populate')
  // populateTags() {
  //   return this._tagsService.populateTags();
  // }

}
