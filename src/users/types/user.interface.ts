export interface IUserEntity {
  id: string;
  email: string;
  role: string;
  created: Date;
  updated: Date;
}

export enum UserSortFields {
  id,
  email,
  created,
  updated,
  role,
}
