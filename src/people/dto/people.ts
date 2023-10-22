import { TagDto } from "src/tags/dto/tags";

export type Person = {
  partitionKey: string;
  rowKey: string;
  name: string;
  nickname: string;
  tags: string;
  gender: string;
  whoIs: string;
  contact: string;
  details: string;
};

export type PersonDto = {
  rowKey: string;
  name: string;
  nickname: string;
  tags: TagDto[];
  gender: string;
  whoIs: string;
  contact: string;
  details: string;
};

export type CreatePersonDto = {
  name: string;
  nickname: string;
  tags: TagDto[]
  gender: string;
  whoIs: string;
  contact: string;
  details: string;
};

export type UpdatePersonDto = {
  rowKey: string;
  name: string;
  nickname: string;
  tags: TagDto[]
  gender: string;
  whoIs: string;
  contact: string;
  details: string;
};

export type DeletePersonDto = {
  rowKey: string;
};
