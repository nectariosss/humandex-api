export type Tag = {
  partitionKey: string;
  rowKey: string;
  name: string;
};

export type TagDto = {
  rowKey: string;
  name: string;
};

export type CreateTagDto = {
  name: string;
};

export type UpdateTagDto = {
  rowKey: string;
  name: string;
};

export type DeleteTagDto = {
  rowKey: string;
};
