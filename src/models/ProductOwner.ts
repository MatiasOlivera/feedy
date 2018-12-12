import Model from './Model';

class ProductOwner extends Model {
  static get tableName(): string {
    return 'product_owners';
  }

  static get timestamps(): boolean {
    return false;
  }

  static get relationMappings() {
    const user = {
      relation: Model.HasOneRelation,
      modelClass: 'User',
      join: { from: 'product_owners.id', to: 'users.id' }
    };

    const organization = {
      relation: Model.HasOneRelation,
      modelClass: 'Organization',
      join: { from: 'product_owners.id', to: 'organizations.id' }
    };

    const products = {
      relation: Model.HasManyRelation,
      modelClass: 'Product',
      join: { from: 'product_owners.id', to: 'products.owner_id' }
    };

    return { user, organization, products };
  }
}

export default ProductOwner;
