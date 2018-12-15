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

export interface IOrganization extends IModel {
  name: string;
  bio: string;
}

export interface IProduct extends IModel {
  name: string;
  description: string;
  ownerId: string;
}

export interface IProductSimplePayload {
  operation: IOperation;
  product: IProduct;
}

export interface IProductPayload extends IProductSimplePayload {
  errors: IValidationErrors;
}

export interface IIssue extends IModel {
  title: string;
  body: string;
  userId: string;
  productId: string;
}

export interface IIssueSimplePayload {
  operation: IOperation;
  issue: IIssue;
}

export interface IIssuePayload extends IIssueSimplePayload {
  errors: IValidationErrors;
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

export interface IValidationErrors {
  [attribute: string]: string;
}
