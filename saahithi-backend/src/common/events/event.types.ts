export enum AppEvents {
  USER_CREATED = 'user.created',
  CONTENT_CREATED = 'content.created',
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
