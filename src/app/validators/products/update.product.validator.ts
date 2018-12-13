import ProductValidator from './product.validator';

class UpdateProductValidator extends ProductValidator {
  rules() {
    return super.rules();
  }
}

export default UpdateProductValidator;
