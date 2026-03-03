export enum AppEvents {
  USER_CREATED = 'user.created',
  USER_DELETED = 'user.deleted',
  CONTENT_CREATED = 'content.created',
  CONTENT_DELETED = 'content.deleted',
}

export interface UserCreatedPayload {
  id: string;
  email: string;
  role: string;
}

export interface ContentCreatedPayload {
  id: string;
  title: string;
  author: string;
  category: string;
}

export interface ContentImageIds {
  imageIds: string[];
}

export interface UserImageId {
  imageId: string;
}
