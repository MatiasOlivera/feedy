import { Comment, Issue, Organization, Product } from '../database/prisma-client';

export interface Model {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Operation {
  status: boolean;
  message: string;
}

export interface Pagination {
  page: number;
  limit: number;
  orderBy: string;
  direction: 'ASC' | 'DESC';
  deleted: boolean;
}

export interface ValidationErrors {
  [attribute: string]: string;
}

/**
 * User
 *
 * @export
 * @interface User
 * @extends {Model}
 */
export interface User extends Model {
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  username: string;
  email: string;
  bio: string;
}

export interface SimpleUserPayload {
  operation: Operation;
  user: User;
}

export interface CreateUserPayload extends SimpleUserPayload {
  errors: CreateUserValidation;
}

export interface CreateUserValidation {
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  username: string | null;
  password: string | null;
  passwordConfirmation: string | null;
  email: string | null;
  bio: string | null;
}

export interface UpdateUserPayload extends SimpleUserPayload {
  errors: UpdateUserValidation;
}

export interface UpdateUserValidation {
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  username: string | null;
  email: string | null;
  bio: string | null;
}

/**
 * Organization
 */

export interface SimpleOrganizationPayload {
  operation: Operation;
  organization: Organization;
}

export interface OrganizationPayload extends SimpleOrganizationPayload {
  errors: OrganizationValidation;
}

export interface OrganizationValidation {
  name: string | null;
  bio: string | null;
}

/**
 * Product
 */

export interface SimpleProductPayload {
  operation: Operation;
  product: Product;
}

export interface ProductPayload extends SimpleProductPayload {
  errors: ProductValidation;
}

export interface ProductValidation {
  name: string | null;
  description: string | null;
  ownerId: string | null;
}

/**
 * Issue
 */

export interface SimpleIssuePayload {
  operation: Operation;
  issue: Issue;
}

export interface IssuePayload extends SimpleIssuePayload {
  errors: IssueValidation;
}

export interface IssueValidation {
  title: string | null;
  body: string | null;
  userId: string | null;
  productId: string | null;
}

/**
 * Comment
 */

export interface SimpleCommentPayload {
  operation: Operation;
  comment: Comment;
}

export interface CreateCommentPayload extends SimpleCommentPayload {
  errors: CreateCommentValidation;
}

export interface CreateCommentValidation {
  body: string | null;
  userId: string | null;
  issueId: string | null;
  parentId: string | null;
}

export interface UpdateCommentPayload extends SimpleCommentPayload {
  errors: UpdateCommentValidation;
}

export interface UpdateCommentValidation {
  body: string | null;
}
