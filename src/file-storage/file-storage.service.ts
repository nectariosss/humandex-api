import { Injectable } from '@nestjs/common';
import { TableClient, TableEntity } from '@azure/data-tables';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { RandomKeyGeneratorService } from 'src/services/random-key-generator/random-key-generator.service';
import {
  CreatePersonDto,
  DeletePersonDto,
  Person,
  PersonDto,
  UpdatePersonDto,
} from 'src/people/dto/people';
import {
  CreateTagDto,
  DeleteTagDto,
  Tag,
  TagDto,
  UpdateTagDto,
} from 'src/tags/dto/tags';
@Injectable()
export class FileStorageService {
  
  // Public variables
  public accountName = this._configService.get<string>('ACCOUNT_NAME');
  public accessKey = this._configService.get<string>('ACCESS_KEY');
  public peopleTable: TableClient;
  public tagsTable: TableClient;

  constructor(
    private _configService: ConfigService,
    private _randomKeygeneratorService: RandomKeyGeneratorService,
  ) {
    const connectionString = `DefaultEndpointsProtocol=https;AccountName=${this.accountName};AccountKey=${this.accessKey};EndpointSuffix=core.windows.net`;
    const peopleTableName = 'people';
    const tagsTableName = 'tags';
    this.peopleTable = TableClient.fromConnectionString(
      connectionString,
      peopleTableName,
    );
    this.tagsTable = TableClient.fromConnectionString(
      connectionString,
      tagsTableName,
    );
  }

  // ------------------ PEOPLE ------------------ //
  /**
   *
   * @returns an array of all the available people in the table
   */
  async getPeople() {
    //on the list entities methods, add the Person type
    const iterator = this.peopleTable.listEntities();
    const people: PersonDto[] = [];
    for await (const entity of iterator) {
      const person: PersonDto = {
        rowKey: entity.rowKey as string,
        name: entity.name as string,
        nickname: entity.nickname as string,
        tags: JSON.parse(entity.tags as string),
        gender: entity.gender as string,
        whoIs: entity.whoIs as string,
        contact: entity.contact as string,
        details: entity.details as string,
      };
      people.push(person);
    }
    return people;
  }

  /**
   *
   * @param person a person object of type CreatePersonDto
   * @returns a person object of type PersonDto
   */
  async createPerson(person: CreatePersonDto):Promise<PersonDto> {
    // this is a Person and not a PersonDto
    const entity: TableEntity<Person> = {
      partitionKey: 'people',
      rowKey: this._randomKeygeneratorService.generateRandomKey(),
      name: person.name,
      nickname: person.nickname,
      tags: JSON.stringify(person.tags),
      gender: person.gender,
      whoIs: person.whoIs,
      contact: person.contact,
      details: person.details,
    };

    try {
      await this.peopleTable.createEntity(entity);
      let returnPerson: PersonDto = {
        rowKey: entity.rowKey,
        name: entity.name,
        nickname: entity.nickname,
        tags: JSON.parse(entity.tags),
        gender: entity.gender,
        whoIs: entity.whoIs,
        contact: entity.contact,
        details: entity.details,
      }
      return returnPerson;
    } catch (error) {
      return error;
    }
  }

  /**
   *
   * @param person a person object of type UpdatePersonDto
   * @returns a person object of type PersonDto
   */
  async updatePerson(person: UpdatePersonDto):Promise<PersonDto> {
    const entity: TableEntity<Person> = {
      partitionKey: 'people',
      rowKey: person.rowKey,
      name: person.name,
      nickname: person.nickname,
      tags: JSON.stringify(person.tags),
      gender: person.gender,
      whoIs: person.whoIs,
      contact: person.contact,
      details: person.details,
    };

    try {
      await this.peopleTable.updateEntity(entity);
      let returnPerson: PersonDto = {
        rowKey: entity.rowKey,
        name: entity.name,
        nickname: entity.nickname,
        tags: JSON.parse(entity.tags),
        gender:entity.gender,
        whoIs: entity.whoIs,
        contact: entity.contact,
        details: entity.details,
      }
      return returnPerson;
    } catch (error) {
      return error;
    }
  }

  /**
   *
   * @param person a person object of type DeletePersonDto
   * @returns a body object with a success message
   */
  async deletePerson(person: DeletePersonDto):Promise<any> {


    try {
      await this.peopleTable.deleteEntity('people', person.rowKey);
      let responseBody = {
        success: 'success',
      }
      return responseBody;
    } catch (error) {
      return error;
    }
  }

  async populatePeoplefromJSON() {
    const people = JSON.parse(readFileSync('./src/data/people.json', 'utf8'));
    const tags = await this.getTags();
    for (const person of people) {
      const personTags:TagDto[] = [];
      for (const tag of tags) {
        if (person.tags.includes(tag.name)) {
          personTags.push({
            rowKey: tag.rowKey,
            name: tag.name,
          });
        }
      }
      const entity = {
        partitionKey: 'people',
        rowKey: this._randomKeygeneratorService.generateRandomKey(),
        name: person.name,
        nickname: person.nickname,
        tags: JSON.stringify(personTags),
        gender: person.gender,
        whoIs: person.whoIs,
        contact: person.contact,
        details: person.details,
      };
      await this.peopleTable.createEntity(entity);
    }
  }

  // ------------------ TAGS ------------------ //

  /**
   *
   * @returns an array of all the available tags in the table
   */
  async getTags(): Promise<TagDto[]> {
    //here it might need a try trach block but not important for now
    const iterator = this.tagsTable.listEntities();
    const tags: TagDto[] = [];
    for await (const entity of iterator) {
      const tag: TagDto = {
        rowKey: entity.rowKey as string,
        name: entity.name as string,
      };
      tags.push(tag);
    }
    return tags;
  }

  /**
   *
   * @param tag a tag object of type CreateTagDto
   * @returns a tag object of type TagDto
   */
  async createTag(tag: CreateTagDto): Promise<TagDto > {
    const entity: TableEntity<Tag> = {
      partitionKey: 'tags',
      rowKey: this._randomKeygeneratorService.generateRandomKey(),
      name: tag.name,
    };
    try {
      await this.tagsTable.createEntity(entity);
      let returnTag: TagDto = {
        rowKey: entity.rowKey,
        name: entity.name,
      }
      return returnTag;
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }

  /**
   *
   * @param tag a tag object of type UpdateTagDto
   * @returns a tag object of type TagDto
   */
  async updateTag(tag: UpdateTagDto): Promise<TagDto> {
    const entity: TableEntity<Tag> = {
      partitionKey: 'tags',
      rowKey: tag.rowKey,
      name: tag.name,
    };
    try {
      await this.tagsTable.updateEntity(entity);
      let returnTag: TagDto = {
        rowKey: entity.rowKey,
        name: entity.name,
      };
      return returnTag;
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }

  /**
   *
   * @param tag a tag object of type DeleteTagDto
   * @returns a body object with a success message
   */
  async deleteTag(tag: DeleteTagDto): Promise<any> {
    const people = await this.getPeople();
    
    for (const person of people) {
      const personTags = person.tags;
      const personTagsKeys  = person.tags.map((tag) => tag.rowKey);
      if (personTagsKeys.includes(tag.rowKey)) {
        // delete the tag from personTagsKeys
        const index = personTagsKeys.indexOf(tag.rowKey);
        personTagsKeys.splice(index, 1);
        // create a new array of tags
        let newPersonTags: TagDto[] = [];
        for (const key of personTagsKeys) {
          const tag = personTags.find((tag) => tag.rowKey === key);
          newPersonTags.push({
            rowKey: tag.rowKey,
            name: tag.name,
          });
        }
        person.tags = newPersonTags;
        try {
          await this.updatePerson(person);
        } catch (error) {
          console.log(error)
          throw new Error(error);
        }
      }
    }



    try {
      await this.tagsTable.deleteEntity('tags', tag.rowKey);
      let responseBody = {
        success: 'success',
      }
      return responseBody;
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }
  }

  async populateTagsfromJSON() {
    const tags = JSON.parse(readFileSync('./src/data/tags.json', 'utf8'));
    for (const tag of tags) {
      const entity = {
        partitionKey: 'tags',
        rowKey: this._randomKeygeneratorService.generateRandomKey(),
        name: tag,
      };
      await this.tagsTable.createEntity(entity);
    }
  }
}
