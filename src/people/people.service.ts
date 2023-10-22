import { Injectable } from '@nestjs/common';
import { CreatePersonDto, DeletePersonDto, PersonDto, UpdatePersonDto } from './dto/people';
import { FileStorageService } from 'src/file-storage/file-storage.service';
import { CreateTableEntityResponse, DeleteTableEntityResponse, UpdateEntityResponse } from '@azure/data-tables';

@Injectable()
export class PeopleService {
 
  constructor(private _fileStorageService: FileStorageService) {}

  getPeople(): Promise<PersonDto[]> {
    return this._fileStorageService.getPeople();
  }

  createPerson(person: CreatePersonDto) :Promise<PersonDto> {
    return this._fileStorageService.createPerson(person);
  }

  updatePerson(person: UpdatePersonDto):Promise<PersonDto> {
    return this._fileStorageService.updatePerson(person);
  }

  deletePerson(person: DeletePersonDto):Promise<any> {
    return this._fileStorageService.deletePerson(person);
  }

  populatePeople() {
    return this._fileStorageService.populatePeoplefromJSON();
  }
}

