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

export interface IUserSimplePayload {
  operation: IOperation;
  user: IUser;
}

export interface IUserPayload extends IUserSimplePayload {
  errors: IValidationErrors;
}

export interface IOrganization extends IModel {
  name: string;
  bio: string;
}

export interface IOrganizationSimplePayload {
  operation: IOperation;
  organization: IOrganization;
}

export interface IOrganizationPayload extends IOrganizationSimplePayload {
  errors: IValidationErrors;
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

export interface IComment extends IModel {
  body: string;
  userId: string;
  issueId: string;
  parentId: string;
}

export interface ICommentSimplePayload {
  operation: IOperation;
  comment: IComment;
}

export interface ICommentPayload extends ICommentSimplePayload {
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
