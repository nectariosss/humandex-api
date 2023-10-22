import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { PeopleService } from './people.service';
import {
  CreatePersonDto,
  DeletePersonDto,
  Person,
  PersonDto,
  UpdatePersonDto,
} from './dto/people';
import { ConfigService } from '@nestjs/config';

@Controller('people')
export class PeopleController {
  constructor(
    private _configService: ConfigService,
    private _peopleService: PeopleService,
  ) {}

  @Get('list')
  getPeople(@Request() req): Promise<PersonDto[]> {
    if (
      req.headers.authorization !== this._configService.get<string>('PASSWORD')
    ) {
      throw new Error('Unauthorized');
    }
    return this._peopleService.getPeople();
  }

  @Post('create')
  addPerson(
    @Request() req,
    @Body() person: CreatePersonDto,
  ): Promise<PersonDto> {
    if (
      req.headers.authorization !== this._configService.get<string>('PASSWORD')
    ) {
      throw new Error('Unauthorized');
    }
    return this._peopleService.createPerson(person);
  }

  @Post('update')
  updatePerson(
    @Request() req,
    @Body() person: UpdatePersonDto,
  ): Promise<PersonDto> {
    return this._peopleService.updatePerson(person);
  }

  @Post('delete')
  deletePerson(@Request() req, @Body() person: DeletePersonDto): Promise<any> {
    if (
      req.headers.authorization !== this._configService.get<string>('PASSWORD')
    ) {
      throw new Error('Unauthorized');
    }
    return this._peopleService.deletePerson(person);
  }

  // the following method is commented out to prevent accidental execution
  //  @Post('populate')
  //   populatePeople() {
  //     return this._peopleService.populatePeople();
  //   }
}
