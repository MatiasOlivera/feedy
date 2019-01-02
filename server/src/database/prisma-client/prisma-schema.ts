export const typeDefs = /* GraphQL */ `type AggregateComment {
  count: Int!
}

type AggregateIssue {
  count: Int!
}

type AggregateOrganization {
  count: Int!
}

type AggregateProduct {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type Comment {
  id: ID!
  body: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  deletedAt: DateTime
  author: User!
  issue: Issue
  parent: Comment
  children(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
}

type CommentConnection {
  pageInfo: PageInfo!
  edges: [CommentEdge]!
  aggregate: AggregateComment!
}

input CommentCreateInput {
  body: String!
  deletedAt: DateTime
  author: UserCreateOneWithoutCommentsInput!
  issue: IssueCreateOneWithoutCommentsInput
  parent: CommentCreateOneWithoutChildrenInput
  children: CommentCreateManyWithoutParentInput
}

input CommentCreateManyWithoutAuthorInput {
  create: [CommentCreateWithoutAuthorInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateManyWithoutIssueInput {
  create: [CommentCreateWithoutIssueInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateManyWithoutParentInput {
  create: [CommentCreateWithoutParentInput!]
  connect: [CommentWhereUniqueInput!]
}

input CommentCreateOneWithoutChildrenInput {
  create: CommentCreateWithoutChildrenInput
  connect: CommentWhereUniqueInput
}

input CommentCreateWithoutAuthorInput {
  body: String!
  deletedAt: DateTime
  issue: IssueCreateOneWithoutCommentsInput
  parent: CommentCreateOneWithoutChildrenInput
  children: CommentCreateManyWithoutParentInput
}

input CommentCreateWithoutChildrenInput {
  body: String!
  deletedAt: DateTime
  author: UserCreateOneWithoutCommentsInput!
  issue: IssueCreateOneWithoutCommentsInput
  parent: CommentCreateOneWithoutChildrenInput
}

input CommentCreateWithoutIssueInput {
  body: String!
  deletedAt: DateTime
  author: UserCreateOneWithoutCommentsInput!
  parent: CommentCreateOneWithoutChildrenInput
  children: CommentCreateManyWithoutParentInput
}

input CommentCreateWithoutParentInput {
  body: String!
  deletedAt: DateTime
  author: UserCreateOneWithoutCommentsInput!
  issue: IssueCreateOneWithoutCommentsInput
  children: CommentCreateManyWithoutParentInput
}

type CommentEdge {
  node: Comment!
  cursor: String!
}

enum CommentOrderByInput {
  id_ASC
  id_DESC
  body_ASC
  body_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  deletedAt_ASC
  deletedAt_DESC
}

type CommentPreviousValues {
  id: ID!
  body: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  deletedAt: DateTime
}

input CommentScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  body: String
  body_not: String
  body_in: [String!]
  body_not_in: [String!]
  body_lt: String
  body_lte: String
  body_gt: String
  body_gte: String
  body_contains: String
  body_not_contains: String
  body_starts_with: String
  body_not_starts_with: String
  body_ends_with: String
  body_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  deletedAt: DateTime
  deletedAt_not: DateTime
  deletedAt_in: [DateTime!]
  deletedAt_not_in: [DateTime!]
  deletedAt_lt: DateTime
  deletedAt_lte: DateTime
  deletedAt_gt: DateTime
  deletedAt_gte: DateTime
  AND: [CommentScalarWhereInput!]
  OR: [CommentScalarWhereInput!]
  NOT: [CommentScalarWhereInput!]
}

type CommentSubscriptionPayload {
  mutation: MutationType!
  node: Comment
  updatedFields: [String!]
  previousValues: CommentPreviousValues
}

input CommentSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: CommentWhereInput
  AND: [CommentSubscriptionWhereInput!]
  OR: [CommentSubscriptionWhereInput!]
  NOT: [CommentSubscriptionWhereInput!]
}

input CommentUpdateInput {
  body: String
  deletedAt: DateTime
  author: UserUpdateOneRequiredWithoutCommentsInput
  issue: IssueUpdateOneWithoutCommentsInput
  parent: CommentUpdateOneWithoutChildrenInput
  children: CommentUpdateManyWithoutParentInput
}

input CommentUpdateManyDataInput {
  body: String
  deletedAt: DateTime
}

input CommentUpdateManyMutationInput {
  body: String
  deletedAt: DateTime
}

input CommentUpdateManyWithoutAuthorInput {
  create: [CommentCreateWithoutAuthorInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutAuthorInput!]
  deleteMany: [CommentScalarWhereInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
}

input CommentUpdateManyWithoutIssueInput {
  create: [CommentCreateWithoutIssueInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutIssueInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutIssueInput!]
  deleteMany: [CommentScalarWhereInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
}

input CommentUpdateManyWithoutParentInput {
  create: [CommentCreateWithoutParentInput!]
  delete: [CommentWhereUniqueInput!]
  connect: [CommentWhereUniqueInput!]
  disconnect: [CommentWhereUniqueInput!]
  update: [CommentUpdateWithWhereUniqueWithoutParentInput!]
  upsert: [CommentUpsertWithWhereUniqueWithoutParentInput!]
  deleteMany: [CommentScalarWhereInput!]
  updateMany: [CommentUpdateManyWithWhereNestedInput!]
}

input CommentUpdateManyWithWhereNestedInput {
  where: CommentScalarWhereInput!
  data: CommentUpdateManyDataInput!
}

input CommentUpdateOneWithoutChildrenInput {
  create: CommentCreateWithoutChildrenInput
  update: CommentUpdateWithoutChildrenDataInput
  upsert: CommentUpsertWithoutChildrenInput
  delete: Boolean
  disconnect: Boolean
  connect: CommentWhereUniqueInput
}

input CommentUpdateWithoutAuthorDataInput {
  body: String
  deletedAt: DateTime
  issue: IssueUpdateOneWithoutCommentsInput
  parent: CommentUpdateOneWithoutChildrenInput
  children: CommentUpdateManyWithoutParentInput
}

input CommentUpdateWithoutChildrenDataInput {
  body: String
  deletedAt: DateTime
  author: UserUpdateOneRequiredWithoutCommentsInput
  issue: IssueUpdateOneWithoutCommentsInput
  parent: CommentUpdateOneWithoutChildrenInput
}

input CommentUpdateWithoutIssueDataInput {
  body: String
  deletedAt: DateTime
  author: UserUpdateOneRequiredWithoutCommentsInput
  parent: CommentUpdateOneWithoutChildrenInput
  children: CommentUpdateManyWithoutParentInput
}

input CommentUpdateWithoutParentDataInput {
  body: String
  deletedAt: DateTime
  author: UserUpdateOneRequiredWithoutCommentsInput
  issue: IssueUpdateOneWithoutCommentsInput
  children: CommentUpdateManyWithoutParentInput
}

input CommentUpdateWithWhereUniqueWithoutAuthorInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutAuthorDataInput!
}

input CommentUpdateWithWhereUniqueWithoutIssueInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutIssueDataInput!
}

input CommentUpdateWithWhereUniqueWithoutParentInput {
  where: CommentWhereUniqueInput!
  data: CommentUpdateWithoutParentDataInput!
}

input CommentUpsertWithoutChildrenInput {
  update: CommentUpdateWithoutChildrenDataInput!
  create: CommentCreateWithoutChildrenInput!
}

input CommentUpsertWithWhereUniqueWithoutAuthorInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutAuthorDataInput!
  create: CommentCreateWithoutAuthorInput!
}

input CommentUpsertWithWhereUniqueWithoutIssueInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutIssueDataInput!
  create: CommentCreateWithoutIssueInput!
}

input CommentUpsertWithWhereUniqueWithoutParentInput {
  where: CommentWhereUniqueInput!
  update: CommentUpdateWithoutParentDataInput!
  create: CommentCreateWithoutParentInput!
}

input CommentWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  body: String
  body_not: String
  body_in: [String!]
  body_not_in: [String!]
  body_lt: String
  body_lte: String
  body_gt: String
  body_gte: String
  body_contains: String
  body_not_contains: String
  body_starts_with: String
  body_not_starts_with: String
  body_ends_with: String
  body_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  deletedAt: DateTime
  deletedAt_not: DateTime
  deletedAt_in: [DateTime!]
  deletedAt_not_in: [DateTime!]
  deletedAt_lt: DateTime
  deletedAt_lte: DateTime
  deletedAt_gt: DateTime
  deletedAt_gte: DateTime
  author: UserWhereInput
  issue: IssueWhereInput
  parent: CommentWhereInput
  children_every: CommentWhereInput
  children_some: CommentWhereInput
  children_none: CommentWhereInput
  AND: [CommentWhereInput!]
  OR: [CommentWhereInput!]
  NOT: [CommentWhereInput!]
}

input CommentWhereUniqueInput {
  id: ID
}

scalar DateTime

type Issue {
  id: ID!
  title: String!
  body: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  deletedAt: DateTime
  author: User!
  product: Product!
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
}

type IssueConnection {
  pageInfo: PageInfo!
  edges: [IssueEdge]!
  aggregate: AggregateIssue!
}

input IssueCreateInput {
  title: String!
  body: String!
  deletedAt: DateTime
  author: UserCreateOneWithoutIssuesInput!
  product: ProductCreateOneWithoutIssuesInput!
  comments: CommentCreateManyWithoutIssueInput
}

input IssueCreateManyWithoutAuthorInput {
  create: [IssueCreateWithoutAuthorInput!]
  connect: [IssueWhereUniqueInput!]
}

input IssueCreateManyWithoutProductInput {
  create: [IssueCreateWithoutProductInput!]
  connect: [IssueWhereUniqueInput!]
}

input IssueCreateOneWithoutCommentsInput {
  create: IssueCreateWithoutCommentsInput
  connect: IssueWhereUniqueInput
}

input IssueCreateWithoutAuthorInput {
  title: String!
  body: String!
  deletedAt: DateTime
  product: ProductCreateOneWithoutIssuesInput!
  comments: CommentCreateManyWithoutIssueInput
}

input IssueCreateWithoutCommentsInput {
  title: String!
  body: String!
  deletedAt: DateTime
  author: UserCreateOneWithoutIssuesInput!
  product: ProductCreateOneWithoutIssuesInput!
}

input IssueCreateWithoutProductInput {
  title: String!
  body: String!
  deletedAt: DateTime
  author: UserCreateOneWithoutIssuesInput!
  comments: CommentCreateManyWithoutIssueInput
}

type IssueEdge {
  node: Issue!
  cursor: String!
}

enum IssueOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  body_ASC
  body_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  deletedAt_ASC
  deletedAt_DESC
}

type IssuePreviousValues {
  id: ID!
  title: String!
  body: String!
  createdAt: DateTime!
  updatedAt: DateTime!
  deletedAt: DateTime
}

input IssueScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  body: String
  body_not: String
  body_in: [String!]
  body_not_in: [String!]
  body_lt: String
  body_lte: String
  body_gt: String
  body_gte: String
  body_contains: String
  body_not_contains: String
  body_starts_with: String
  body_not_starts_with: String
  body_ends_with: String
  body_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  deletedAt: DateTime
  deletedAt_not: DateTime
  deletedAt_in: [DateTime!]
  deletedAt_not_in: [DateTime!]
  deletedAt_lt: DateTime
  deletedAt_lte: DateTime
  deletedAt_gt: DateTime
  deletedAt_gte: DateTime
  AND: [IssueScalarWhereInput!]
  OR: [IssueScalarWhereInput!]
  NOT: [IssueScalarWhereInput!]
}

type IssueSubscriptionPayload {
  mutation: MutationType!
  node: Issue
  updatedFields: [String!]
  previousValues: IssuePreviousValues
}

input IssueSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: IssueWhereInput
  AND: [IssueSubscriptionWhereInput!]
  OR: [IssueSubscriptionWhereInput!]
  NOT: [IssueSubscriptionWhereInput!]
}

input IssueUpdateInput {
  title: String
  body: String
  deletedAt: DateTime
  author: UserUpdateOneRequiredWithoutIssuesInput
  product: ProductUpdateOneRequiredWithoutIssuesInput
  comments: CommentUpdateManyWithoutIssueInput
}

input IssueUpdateManyDataInput {
  title: String
  body: String
  deletedAt: DateTime
}

input IssueUpdateManyMutationInput {
  title: String
  body: String
  deletedAt: DateTime
}

input IssueUpdateManyWithoutAuthorInput {
  create: [IssueCreateWithoutAuthorInput!]
  delete: [IssueWhereUniqueInput!]
  connect: [IssueWhereUniqueInput!]
  disconnect: [IssueWhereUniqueInput!]
  update: [IssueUpdateWithWhereUniqueWithoutAuthorInput!]
  upsert: [IssueUpsertWithWhereUniqueWithoutAuthorInput!]
  deleteMany: [IssueScalarWhereInput!]
  updateMany: [IssueUpdateManyWithWhereNestedInput!]
}

input IssueUpdateManyWithoutProductInput {
  create: [IssueCreateWithoutProductInput!]
  delete: [IssueWhereUniqueInput!]
  connect: [IssueWhereUniqueInput!]
  disconnect: [IssueWhereUniqueInput!]
  update: [IssueUpdateWithWhereUniqueWithoutProductInput!]
  upsert: [IssueUpsertWithWhereUniqueWithoutProductInput!]
  deleteMany: [IssueScalarWhereInput!]
  updateMany: [IssueUpdateManyWithWhereNestedInput!]
}

input IssueUpdateManyWithWhereNestedInput {
  where: IssueScalarWhereInput!
  data: IssueUpdateManyDataInput!
}

input IssueUpdateOneWithoutCommentsInput {
  create: IssueCreateWithoutCommentsInput
  update: IssueUpdateWithoutCommentsDataInput
  upsert: IssueUpsertWithoutCommentsInput
  delete: Boolean
  disconnect: Boolean
  connect: IssueWhereUniqueInput
}

input IssueUpdateWithoutAuthorDataInput {
  title: String
  body: String
  deletedAt: DateTime
  product: ProductUpdateOneRequiredWithoutIssuesInput
  comments: CommentUpdateManyWithoutIssueInput
}

input IssueUpdateWithoutCommentsDataInput {
  title: String
  body: String
  deletedAt: DateTime
  author: UserUpdateOneRequiredWithoutIssuesInput
  product: ProductUpdateOneRequiredWithoutIssuesInput
}

input IssueUpdateWithoutProductDataInput {
  title: String
  body: String
  deletedAt: DateTime
  author: UserUpdateOneRequiredWithoutIssuesInput
  comments: CommentUpdateManyWithoutIssueInput
}

input IssueUpdateWithWhereUniqueWithoutAuthorInput {
  where: IssueWhereUniqueInput!
  data: IssueUpdateWithoutAuthorDataInput!
}

input IssueUpdateWithWhereUniqueWithoutProductInput {
  where: IssueWhereUniqueInput!
  data: IssueUpdateWithoutProductDataInput!
}

input IssueUpsertWithoutCommentsInput {
  update: IssueUpdateWithoutCommentsDataInput!
  create: IssueCreateWithoutCommentsInput!
}

input IssueUpsertWithWhereUniqueWithoutAuthorInput {
  where: IssueWhereUniqueInput!
  update: IssueUpdateWithoutAuthorDataInput!
  create: IssueCreateWithoutAuthorInput!
}

input IssueUpsertWithWhereUniqueWithoutProductInput {
  where: IssueWhereUniqueInput!
  update: IssueUpdateWithoutProductDataInput!
  create: IssueCreateWithoutProductInput!
}

input IssueWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  body: String
  body_not: String
  body_in: [String!]
  body_not_in: [String!]
  body_lt: String
  body_lte: String
  body_gt: String
  body_gte: String
  body_contains: String
  body_not_contains: String
  body_starts_with: String
  body_not_starts_with: String
  body_ends_with: String
  body_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  deletedAt: DateTime
  deletedAt_not: DateTime
  deletedAt_in: [DateTime!]
  deletedAt_not_in: [DateTime!]
  deletedAt_lt: DateTime
  deletedAt_lte: DateTime
  deletedAt_gt: DateTime
  deletedAt_gte: DateTime
  author: UserWhereInput
  product: ProductWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
  AND: [IssueWhereInput!]
  OR: [IssueWhereInput!]
  NOT: [IssueWhereInput!]
}

input IssueWhereUniqueInput {
  id: ID
}

scalar Long

type Mutation {
  createComment(data: CommentCreateInput!): Comment!
  updateComment(data: CommentUpdateInput!, where: CommentWhereUniqueInput!): Comment
  updateManyComments(data: CommentUpdateManyMutationInput!, where: CommentWhereInput): BatchPayload!
  upsertComment(where: CommentWhereUniqueInput!, create: CommentCreateInput!, update: CommentUpdateInput!): Comment!
  deleteComment(where: CommentWhereUniqueInput!): Comment
  deleteManyComments(where: CommentWhereInput): BatchPayload!
  createIssue(data: IssueCreateInput!): Issue!
  updateIssue(data: IssueUpdateInput!, where: IssueWhereUniqueInput!): Issue
  updateManyIssues(data: IssueUpdateManyMutationInput!, where: IssueWhereInput): BatchPayload!
  upsertIssue(where: IssueWhereUniqueInput!, create: IssueCreateInput!, update: IssueUpdateInput!): Issue!
  deleteIssue(where: IssueWhereUniqueInput!): Issue
  deleteManyIssues(where: IssueWhereInput): BatchPayload!
  createOrganization(data: OrganizationCreateInput!): Organization!
  updateOrganization(data: OrganizationUpdateInput!, where: OrganizationWhereUniqueInput!): Organization
  updateManyOrganizations(data: OrganizationUpdateManyMutationInput!, where: OrganizationWhereInput): BatchPayload!
  upsertOrganization(where: OrganizationWhereUniqueInput!, create: OrganizationCreateInput!, update: OrganizationUpdateInput!): Organization!
  deleteOrganization(where: OrganizationWhereUniqueInput!): Organization
  deleteManyOrganizations(where: OrganizationWhereInput): BatchPayload!
  createProduct(data: ProductCreateInput!): Product!
  updateProduct(data: ProductUpdateInput!, where: ProductWhereUniqueInput!): Product
  updateManyProducts(data: ProductUpdateManyMutationInput!, where: ProductWhereInput): BatchPayload!
  upsertProduct(where: ProductWhereUniqueInput!, create: ProductCreateInput!, update: ProductUpdateInput!): Product!
  deleteProduct(where: ProductWhereUniqueInput!): Product
  deleteManyProducts(where: ProductWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type Organization {
  id: ID!
  name: String!
  bio: String
  createdAt: DateTime!
  updatedAt: DateTime!
  deletedAt: DateTime
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product!]
  members(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type OrganizationConnection {
  pageInfo: PageInfo!
  edges: [OrganizationEdge]!
  aggregate: AggregateOrganization!
}

input OrganizationCreateInput {
  name: String!
  bio: String
  deletedAt: DateTime
  products: ProductCreateManyWithoutOrganizationInput
  members: UserCreateManyWithoutOrganizationsInput
}

input OrganizationCreateManyWithoutMembersInput {
  create: [OrganizationCreateWithoutMembersInput!]
  connect: [OrganizationWhereUniqueInput!]
}

input OrganizationCreateOneWithoutProductsInput {
  create: OrganizationCreateWithoutProductsInput
  connect: OrganizationWhereUniqueInput
}

input OrganizationCreateWithoutMembersInput {
  name: String!
  bio: String
  deletedAt: DateTime
  products: ProductCreateManyWithoutOrganizationInput
}

input OrganizationCreateWithoutProductsInput {
  name: String!
  bio: String
  deletedAt: DateTime
  members: UserCreateManyWithoutOrganizationsInput
}

type OrganizationEdge {
  node: Organization!
  cursor: String!
}

enum OrganizationOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  bio_ASC
  bio_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  deletedAt_ASC
  deletedAt_DESC
}

type OrganizationPreviousValues {
  id: ID!
  name: String!
  bio: String
  createdAt: DateTime!
  updatedAt: DateTime!
  deletedAt: DateTime
}

input OrganizationScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  bio: String
  bio_not: String
  bio_in: [String!]
  bio_not_in: [String!]
  bio_lt: String
  bio_lte: String
  bio_gt: String
  bio_gte: String
  bio_contains: String
  bio_not_contains: String
  bio_starts_with: String
  bio_not_starts_with: String
  bio_ends_with: String
  bio_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  deletedAt: DateTime
  deletedAt_not: DateTime
  deletedAt_in: [DateTime!]
  deletedAt_not_in: [DateTime!]
  deletedAt_lt: DateTime
  deletedAt_lte: DateTime
  deletedAt_gt: DateTime
  deletedAt_gte: DateTime
  AND: [OrganizationScalarWhereInput!]
  OR: [OrganizationScalarWhereInput!]
  NOT: [OrganizationScalarWhereInput!]
}

type OrganizationSubscriptionPayload {
  mutation: MutationType!
  node: Organization
  updatedFields: [String!]
  previousValues: OrganizationPreviousValues
}

input OrganizationSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: OrganizationWhereInput
  AND: [OrganizationSubscriptionWhereInput!]
  OR: [OrganizationSubscriptionWhereInput!]
  NOT: [OrganizationSubscriptionWhereInput!]
}

input OrganizationUpdateInput {
  name: String
  bio: String
  deletedAt: DateTime
  products: ProductUpdateManyWithoutOrganizationInput
  members: UserUpdateManyWithoutOrganizationsInput
}

input OrganizationUpdateManyDataInput {
  name: String
  bio: String
  deletedAt: DateTime
}

input OrganizationUpdateManyMutationInput {
  name: String
  bio: String
  deletedAt: DateTime
}

input OrganizationUpdateManyWithoutMembersInput {
  create: [OrganizationCreateWithoutMembersInput!]
  delete: [OrganizationWhereUniqueInput!]
  connect: [OrganizationWhereUniqueInput!]
  disconnect: [OrganizationWhereUniqueInput!]
  update: [OrganizationUpdateWithWhereUniqueWithoutMembersInput!]
  upsert: [OrganizationUpsertWithWhereUniqueWithoutMembersInput!]
  deleteMany: [OrganizationScalarWhereInput!]
  updateMany: [OrganizationUpdateManyWithWhereNestedInput!]
}

input OrganizationUpdateManyWithWhereNestedInput {
  where: OrganizationScalarWhereInput!
  data: OrganizationUpdateManyDataInput!
}

input OrganizationUpdateOneWithoutProductsInput {
  create: OrganizationCreateWithoutProductsInput
  update: OrganizationUpdateWithoutProductsDataInput
  upsert: OrganizationUpsertWithoutProductsInput
  delete: Boolean
  disconnect: Boolean
  connect: OrganizationWhereUniqueInput
}

input OrganizationUpdateWithoutMembersDataInput {
  name: String
  bio: String
  deletedAt: DateTime
  products: ProductUpdateManyWithoutOrganizationInput
}

input OrganizationUpdateWithoutProductsDataInput {
  name: String
  bio: String
  deletedAt: DateTime
  members: UserUpdateManyWithoutOrganizationsInput
}

input OrganizationUpdateWithWhereUniqueWithoutMembersInput {
  where: OrganizationWhereUniqueInput!
  data: OrganizationUpdateWithoutMembersDataInput!
}

input OrganizationUpsertWithoutProductsInput {
  update: OrganizationUpdateWithoutProductsDataInput!
  create: OrganizationCreateWithoutProductsInput!
}

input OrganizationUpsertWithWhereUniqueWithoutMembersInput {
  where: OrganizationWhereUniqueInput!
  update: OrganizationUpdateWithoutMembersDataInput!
  create: OrganizationCreateWithoutMembersInput!
}

input OrganizationWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  bio: String
  bio_not: String
  bio_in: [String!]
  bio_not_in: [String!]
  bio_lt: String
  bio_lte: String
  bio_gt: String
  bio_gte: String
  bio_contains: String
  bio_not_contains: String
  bio_starts_with: String
  bio_not_starts_with: String
  bio_ends_with: String
  bio_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  deletedAt: DateTime
  deletedAt_not: DateTime
  deletedAt_in: [DateTime!]
  deletedAt_not_in: [DateTime!]
  deletedAt_lt: DateTime
  deletedAt_lte: DateTime
  deletedAt_gt: DateTime
  deletedAt_gte: DateTime
  products_every: ProductWhereInput
  products_some: ProductWhereInput
  products_none: ProductWhereInput
  members_every: UserWhereInput
  members_some: UserWhereInput
  members_none: UserWhereInput
  AND: [OrganizationWhereInput!]
  OR: [OrganizationWhereInput!]
  NOT: [OrganizationWhereInput!]
}

input OrganizationWhereUniqueInput {
  id: ID
  name: String
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Product {
  id: ID!
  name: String!
  description: String
  createdAt: DateTime!
  updatedAt: DateTime!
  deletedAt: DateTime
  user: User
  organization: Organization
  issues(where: IssueWhereInput, orderBy: IssueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Issue!]
}

type ProductConnection {
  pageInfo: PageInfo!
  edges: [ProductEdge]!
  aggregate: AggregateProduct!
}

input ProductCreateInput {
  name: String!
  description: String
  deletedAt: DateTime
  user: UserCreateOneWithoutProductsInput
  organization: OrganizationCreateOneWithoutProductsInput
  issues: IssueCreateManyWithoutProductInput
}

input ProductCreateManyWithoutOrganizationInput {
  create: [ProductCreateWithoutOrganizationInput!]
  connect: [ProductWhereUniqueInput!]
}

input ProductCreateManyWithoutUserInput {
  create: [ProductCreateWithoutUserInput!]
  connect: [ProductWhereUniqueInput!]
}

input ProductCreateOneWithoutIssuesInput {
  create: ProductCreateWithoutIssuesInput
  connect: ProductWhereUniqueInput
}

input ProductCreateWithoutIssuesInput {
  name: String!
  description: String
  deletedAt: DateTime
  user: UserCreateOneWithoutProductsInput
  organization: OrganizationCreateOneWithoutProductsInput
}

input ProductCreateWithoutOrganizationInput {
  name: String!
  description: String
  deletedAt: DateTime
  user: UserCreateOneWithoutProductsInput
  issues: IssueCreateManyWithoutProductInput
}

input ProductCreateWithoutUserInput {
  name: String!
  description: String
  deletedAt: DateTime
  organization: OrganizationCreateOneWithoutProductsInput
  issues: IssueCreateManyWithoutProductInput
}

type ProductEdge {
  node: Product!
  cursor: String!
}

enum ProductOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  deletedAt_ASC
  deletedAt_DESC
}

type ProductPreviousValues {
  id: ID!
  name: String!
  description: String
  createdAt: DateTime!
  updatedAt: DateTime!
  deletedAt: DateTime
}

input ProductScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  deletedAt: DateTime
  deletedAt_not: DateTime
  deletedAt_in: [DateTime!]
  deletedAt_not_in: [DateTime!]
  deletedAt_lt: DateTime
  deletedAt_lte: DateTime
  deletedAt_gt: DateTime
  deletedAt_gte: DateTime
  AND: [ProductScalarWhereInput!]
  OR: [ProductScalarWhereInput!]
  NOT: [ProductScalarWhereInput!]
}

type ProductSubscriptionPayload {
  mutation: MutationType!
  node: Product
  updatedFields: [String!]
  previousValues: ProductPreviousValues
}

input ProductSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ProductWhereInput
  AND: [ProductSubscriptionWhereInput!]
  OR: [ProductSubscriptionWhereInput!]
  NOT: [ProductSubscriptionWhereInput!]
}

input ProductUpdateInput {
  name: String
  description: String
  deletedAt: DateTime
  user: UserUpdateOneWithoutProductsInput
  organization: OrganizationUpdateOneWithoutProductsInput
  issues: IssueUpdateManyWithoutProductInput
}

input ProductUpdateManyDataInput {
  name: String
  description: String
  deletedAt: DateTime
}

input ProductUpdateManyMutationInput {
  name: String
  description: String
  deletedAt: DateTime
}

input ProductUpdateManyWithoutOrganizationInput {
  create: [ProductCreateWithoutOrganizationInput!]
  delete: [ProductWhereUniqueInput!]
  connect: [ProductWhereUniqueInput!]
  disconnect: [ProductWhereUniqueInput!]
  update: [ProductUpdateWithWhereUniqueWithoutOrganizationInput!]
  upsert: [ProductUpsertWithWhereUniqueWithoutOrganizationInput!]
  deleteMany: [ProductScalarWhereInput!]
  updateMany: [ProductUpdateManyWithWhereNestedInput!]
}

input ProductUpdateManyWithoutUserInput {
  create: [ProductCreateWithoutUserInput!]
  delete: [ProductWhereUniqueInput!]
  connect: [ProductWhereUniqueInput!]
  disconnect: [ProductWhereUniqueInput!]
  update: [ProductUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [ProductUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [ProductScalarWhereInput!]
  updateMany: [ProductUpdateManyWithWhereNestedInput!]
}

input ProductUpdateManyWithWhereNestedInput {
  where: ProductScalarWhereInput!
  data: ProductUpdateManyDataInput!
}

input ProductUpdateOneRequiredWithoutIssuesInput {
  create: ProductCreateWithoutIssuesInput
  update: ProductUpdateWithoutIssuesDataInput
  upsert: ProductUpsertWithoutIssuesInput
  connect: ProductWhereUniqueInput
}

input ProductUpdateWithoutIssuesDataInput {
  name: String
  description: String
  deletedAt: DateTime
  user: UserUpdateOneWithoutProductsInput
  organization: OrganizationUpdateOneWithoutProductsInput
}

input ProductUpdateWithoutOrganizationDataInput {
  name: String
  description: String
  deletedAt: DateTime
  user: UserUpdateOneWithoutProductsInput
  issues: IssueUpdateManyWithoutProductInput
}

input ProductUpdateWithoutUserDataInput {
  name: String
  description: String
  deletedAt: DateTime
  organization: OrganizationUpdateOneWithoutProductsInput
  issues: IssueUpdateManyWithoutProductInput
}

input ProductUpdateWithWhereUniqueWithoutOrganizationInput {
  where: ProductWhereUniqueInput!
  data: ProductUpdateWithoutOrganizationDataInput!
}

input ProductUpdateWithWhereUniqueWithoutUserInput {
  where: ProductWhereUniqueInput!
  data: ProductUpdateWithoutUserDataInput!
}

input ProductUpsertWithoutIssuesInput {
  update: ProductUpdateWithoutIssuesDataInput!
  create: ProductCreateWithoutIssuesInput!
}

input ProductUpsertWithWhereUniqueWithoutOrganizationInput {
  where: ProductWhereUniqueInput!
  update: ProductUpdateWithoutOrganizationDataInput!
  create: ProductCreateWithoutOrganizationInput!
}

input ProductUpsertWithWhereUniqueWithoutUserInput {
  where: ProductWhereUniqueInput!
  update: ProductUpdateWithoutUserDataInput!
  create: ProductCreateWithoutUserInput!
}

input ProductWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  deletedAt: DateTime
  deletedAt_not: DateTime
  deletedAt_in: [DateTime!]
  deletedAt_not_in: [DateTime!]
  deletedAt_lt: DateTime
  deletedAt_lte: DateTime
  deletedAt_gt: DateTime
  deletedAt_gte: DateTime
  user: UserWhereInput
  organization: OrganizationWhereInput
  issues_every: IssueWhereInput
  issues_some: IssueWhereInput
  issues_none: IssueWhereInput
  AND: [ProductWhereInput!]
  OR: [ProductWhereInput!]
  NOT: [ProductWhereInput!]
}

input ProductWhereUniqueInput {
  id: ID
}

type Query {
  comment(where: CommentWhereUniqueInput!): Comment
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment]!
  commentsConnection(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): CommentConnection!
  issue(where: IssueWhereUniqueInput!): Issue
  issues(where: IssueWhereInput, orderBy: IssueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Issue]!
  issuesConnection(where: IssueWhereInput, orderBy: IssueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): IssueConnection!
  organization(where: OrganizationWhereUniqueInput!): Organization
  organizations(where: OrganizationWhereInput, orderBy: OrganizationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Organization]!
  organizationsConnection(where: OrganizationWhereInput, orderBy: OrganizationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): OrganizationConnection!
  product(where: ProductWhereUniqueInput!): Product
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product]!
  productsConnection(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProductConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  comment(where: CommentSubscriptionWhereInput): CommentSubscriptionPayload
  issue(where: IssueSubscriptionWhereInput): IssueSubscriptionPayload
  organization(where: OrganizationSubscriptionWhereInput): OrganizationSubscriptionPayload
  product(where: ProductSubscriptionWhereInput): ProductSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  firstName: String!
  lastName: String!
  gender: String!
  username: String!
  password: String!
  email: String!
  bio: String
  createdAt: DateTime!
  updatedAt: DateTime!
  deletedAt: DateTime
  products(where: ProductWhereInput, orderBy: ProductOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Product!]
  organizations(where: OrganizationWhereInput, orderBy: OrganizationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Organization!]
  issues(where: IssueWhereInput, orderBy: IssueOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Issue!]
  comments(where: CommentWhereInput, orderBy: CommentOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Comment!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  firstName: String!
  lastName: String!
  gender: String!
  username: String!
  password: String!
  email: String!
  bio: String
  deletedAt: DateTime
  products: ProductCreateManyWithoutUserInput
  organizations: OrganizationCreateManyWithoutMembersInput
  issues: IssueCreateManyWithoutAuthorInput
  comments: CommentCreateManyWithoutAuthorInput
}

input UserCreateManyWithoutOrganizationsInput {
  create: [UserCreateWithoutOrganizationsInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateOneWithoutCommentsInput {
  create: UserCreateWithoutCommentsInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutIssuesInput {
  create: UserCreateWithoutIssuesInput
  connect: UserWhereUniqueInput
}

input UserCreateOneWithoutProductsInput {
  create: UserCreateWithoutProductsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutCommentsInput {
  firstName: String!
  lastName: String!
  gender: String!
  username: String!
  password: String!
  email: String!
  bio: String
  deletedAt: DateTime
  products: ProductCreateManyWithoutUserInput
  organizations: OrganizationCreateManyWithoutMembersInput
  issues: IssueCreateManyWithoutAuthorInput
}

input UserCreateWithoutIssuesInput {
  firstName: String!
  lastName: String!
  gender: String!
  username: String!
  password: String!
  email: String!
  bio: String
  deletedAt: DateTime
  products: ProductCreateManyWithoutUserInput
  organizations: OrganizationCreateManyWithoutMembersInput
  comments: CommentCreateManyWithoutAuthorInput
}

input UserCreateWithoutOrganizationsInput {
  firstName: String!
  lastName: String!
  gender: String!
  username: String!
  password: String!
  email: String!
  bio: String
  deletedAt: DateTime
  products: ProductCreateManyWithoutUserInput
  issues: IssueCreateManyWithoutAuthorInput
  comments: CommentCreateManyWithoutAuthorInput
}

input UserCreateWithoutProductsInput {
  firstName: String!
  lastName: String!
  gender: String!
  username: String!
  password: String!
  email: String!
  bio: String
  deletedAt: DateTime
  organizations: OrganizationCreateManyWithoutMembersInput
  issues: IssueCreateManyWithoutAuthorInput
  comments: CommentCreateManyWithoutAuthorInput
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  firstName_ASC
  firstName_DESC
  lastName_ASC
  lastName_DESC
  gender_ASC
  gender_DESC
  username_ASC
  username_DESC
  password_ASC
  password_DESC
  email_ASC
  email_DESC
  bio_ASC
  bio_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  deletedAt_ASC
  deletedAt_DESC
}

type UserPreviousValues {
  id: ID!
  firstName: String!
  lastName: String!
  gender: String!
  username: String!
  password: String!
  email: String!
  bio: String
  createdAt: DateTime!
  updatedAt: DateTime!
  deletedAt: DateTime
}

input UserScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  gender: String
  gender_not: String
  gender_in: [String!]
  gender_not_in: [String!]
  gender_lt: String
  gender_lte: String
  gender_gt: String
  gender_gte: String
  gender_contains: String
  gender_not_contains: String
  gender_starts_with: String
  gender_not_starts_with: String
  gender_ends_with: String
  gender_not_ends_with: String
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  bio: String
  bio_not: String
  bio_in: [String!]
  bio_not_in: [String!]
  bio_lt: String
  bio_lte: String
  bio_gt: String
  bio_gte: String
  bio_contains: String
  bio_not_contains: String
  bio_starts_with: String
  bio_not_starts_with: String
  bio_ends_with: String
  bio_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  deletedAt: DateTime
  deletedAt_not: DateTime
  deletedAt_in: [DateTime!]
  deletedAt_not_in: [DateTime!]
  deletedAt_lt: DateTime
  deletedAt_lte: DateTime
  deletedAt_gt: DateTime
  deletedAt_gte: DateTime
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  firstName: String
  lastName: String
  gender: String
  username: String
  password: String
  email: String
  bio: String
  deletedAt: DateTime
  products: ProductUpdateManyWithoutUserInput
  organizations: OrganizationUpdateManyWithoutMembersInput
  issues: IssueUpdateManyWithoutAuthorInput
  comments: CommentUpdateManyWithoutAuthorInput
}

input UserUpdateManyDataInput {
  firstName: String
  lastName: String
  gender: String
  username: String
  password: String
  email: String
  bio: String
  deletedAt: DateTime
}

input UserUpdateManyMutationInput {
  firstName: String
  lastName: String
  gender: String
  username: String
  password: String
  email: String
  bio: String
  deletedAt: DateTime
}

input UserUpdateManyWithoutOrganizationsInput {
  create: [UserCreateWithoutOrganizationsInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutOrganizationsInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutOrganizationsInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdateOneRequiredWithoutCommentsInput {
  create: UserCreateWithoutCommentsInput
  update: UserUpdateWithoutCommentsDataInput
  upsert: UserUpsertWithoutCommentsInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneRequiredWithoutIssuesInput {
  create: UserCreateWithoutIssuesInput
  update: UserUpdateWithoutIssuesDataInput
  upsert: UserUpsertWithoutIssuesInput
  connect: UserWhereUniqueInput
}

input UserUpdateOneWithoutProductsInput {
  create: UserCreateWithoutProductsInput
  update: UserUpdateWithoutProductsDataInput
  upsert: UserUpsertWithoutProductsInput
  delete: Boolean
  disconnect: Boolean
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutCommentsDataInput {
  firstName: String
  lastName: String
  gender: String
  username: String
  password: String
  email: String
  bio: String
  deletedAt: DateTime
  products: ProductUpdateManyWithoutUserInput
  organizations: OrganizationUpdateManyWithoutMembersInput
  issues: IssueUpdateManyWithoutAuthorInput
}

input UserUpdateWithoutIssuesDataInput {
  firstName: String
  lastName: String
  gender: String
  username: String
  password: String
  email: String
  bio: String
  deletedAt: DateTime
  products: ProductUpdateManyWithoutUserInput
  organizations: OrganizationUpdateManyWithoutMembersInput
  comments: CommentUpdateManyWithoutAuthorInput
}

input UserUpdateWithoutOrganizationsDataInput {
  firstName: String
  lastName: String
  gender: String
  username: String
  password: String
  email: String
  bio: String
  deletedAt: DateTime
  products: ProductUpdateManyWithoutUserInput
  issues: IssueUpdateManyWithoutAuthorInput
  comments: CommentUpdateManyWithoutAuthorInput
}

input UserUpdateWithoutProductsDataInput {
  firstName: String
  lastName: String
  gender: String
  username: String
  password: String
  email: String
  bio: String
  deletedAt: DateTime
  organizations: OrganizationUpdateManyWithoutMembersInput
  issues: IssueUpdateManyWithoutAuthorInput
  comments: CommentUpdateManyWithoutAuthorInput
}

input UserUpdateWithWhereUniqueWithoutOrganizationsInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutOrganizationsDataInput!
}

input UserUpsertWithoutCommentsInput {
  update: UserUpdateWithoutCommentsDataInput!
  create: UserCreateWithoutCommentsInput!
}

input UserUpsertWithoutIssuesInput {
  update: UserUpdateWithoutIssuesDataInput!
  create: UserCreateWithoutIssuesInput!
}

input UserUpsertWithoutProductsInput {
  update: UserUpdateWithoutProductsDataInput!
  create: UserCreateWithoutProductsInput!
}

input UserUpsertWithWhereUniqueWithoutOrganizationsInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutOrganizationsDataInput!
  create: UserCreateWithoutOrganizationsInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  firstName: String
  firstName_not: String
  firstName_in: [String!]
  firstName_not_in: [String!]
  firstName_lt: String
  firstName_lte: String
  firstName_gt: String
  firstName_gte: String
  firstName_contains: String
  firstName_not_contains: String
  firstName_starts_with: String
  firstName_not_starts_with: String
  firstName_ends_with: String
  firstName_not_ends_with: String
  lastName: String
  lastName_not: String
  lastName_in: [String!]
  lastName_not_in: [String!]
  lastName_lt: String
  lastName_lte: String
  lastName_gt: String
  lastName_gte: String
  lastName_contains: String
  lastName_not_contains: String
  lastName_starts_with: String
  lastName_not_starts_with: String
  lastName_ends_with: String
  lastName_not_ends_with: String
  gender: String
  gender_not: String
  gender_in: [String!]
  gender_not_in: [String!]
  gender_lt: String
  gender_lte: String
  gender_gt: String
  gender_gte: String
  gender_contains: String
  gender_not_contains: String
  gender_starts_with: String
  gender_not_starts_with: String
  gender_ends_with: String
  gender_not_ends_with: String
  username: String
  username_not: String
  username_in: [String!]
  username_not_in: [String!]
  username_lt: String
  username_lte: String
  username_gt: String
  username_gte: String
  username_contains: String
  username_not_contains: String
  username_starts_with: String
  username_not_starts_with: String
  username_ends_with: String
  username_not_ends_with: String
  password: String
  password_not: String
  password_in: [String!]
  password_not_in: [String!]
  password_lt: String
  password_lte: String
  password_gt: String
  password_gte: String
  password_contains: String
  password_not_contains: String
  password_starts_with: String
  password_not_starts_with: String
  password_ends_with: String
  password_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  bio: String
  bio_not: String
  bio_in: [String!]
  bio_not_in: [String!]
  bio_lt: String
  bio_lte: String
  bio_gt: String
  bio_gte: String
  bio_contains: String
  bio_not_contains: String
  bio_starts_with: String
  bio_not_starts_with: String
  bio_ends_with: String
  bio_not_ends_with: String
  createdAt: DateTime
  createdAt_not: DateTime
  createdAt_in: [DateTime!]
  createdAt_not_in: [DateTime!]
  createdAt_lt: DateTime
  createdAt_lte: DateTime
  createdAt_gt: DateTime
  createdAt_gte: DateTime
  updatedAt: DateTime
  updatedAt_not: DateTime
  updatedAt_in: [DateTime!]
  updatedAt_not_in: [DateTime!]
  updatedAt_lt: DateTime
  updatedAt_lte: DateTime
  updatedAt_gt: DateTime
  updatedAt_gte: DateTime
  deletedAt: DateTime
  deletedAt_not: DateTime
  deletedAt_in: [DateTime!]
  deletedAt_not_in: [DateTime!]
  deletedAt_lt: DateTime
  deletedAt_lte: DateTime
  deletedAt_gt: DateTime
  deletedAt_gte: DateTime
  products_every: ProductWhereInput
  products_some: ProductWhereInput
  products_none: ProductWhereInput
  organizations_every: OrganizationWhereInput
  organizations_some: OrganizationWhereInput
  organizations_none: OrganizationWhereInput
  issues_every: IssueWhereInput
  issues_some: IssueWhereInput
  issues_none: IssueWhereInput
  comments_every: CommentWhereInput
  comments_some: CommentWhereInput
  comments_none: CommentWhereInput
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  username: String
  email: String
}
`