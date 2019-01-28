import { MutationResolvers } from '../../../graphql/resolvers.types';
import ProductValidator from './product.validator';

class UpdateProductValidator extends ProductValidator<
  MutationResolvers.UpdateProductInput
> {
  rules() {
    return super.rules();
  }
}

export default UpdateProductValidator;
