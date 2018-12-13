// eslint-disable-next-line no-underscore-dangle
function __resolveType(parent: any) {
  return parent.hasOwnProperty('username') ? 'User' : 'Organization';
}

export default { ProductOwner: { __resolveType } };
