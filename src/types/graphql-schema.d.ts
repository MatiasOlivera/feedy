export interface IModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IUser extends IModel {
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  username: string;
  email: string;
  bio: string;
}

export interface IPagination {
  page: number;
  limit: number;
  orderBy: string;
  direction: 'ASC' | 'DESC';
  deleted: boolean;
}

export interface IOperation {
  status: boolean;
  message: string;
}
