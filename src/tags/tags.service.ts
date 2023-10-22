import { Injectable } from '@nestjs/common';
import {
  CreateTagDto,
  DeleteTagDto,
  Tag,
  TagDto,
  UpdateTagDto,
} from './dto/tags';
import { FileStorageService } from 'src/file-storage/file-storage.service';

@Injectable()
export class TagsService {
  constructor(private _fileStorageService: FileStorageService) {}

  getTags(): Promise<TagDto[]> {
    return this._fileStorageService.getTags();
  }

  createTag(tag: CreateTagDto): Promise<TagDto> {
    return this._fileStorageService.createTag(tag);
  }

  updateTag(tag: UpdateTagDto): Promise<TagDto> {
    return this._fileStorageService.updateTag(tag);
  }

  deleteTag(tag: DeleteTagDto): Promise<any> {
    return this._fileStorageService.deleteTag(tag);
  }

  populateTags() {
    return this._fileStorageService.populateTagsfromJSON();
  }
}
