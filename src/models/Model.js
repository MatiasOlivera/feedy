const { Model: ObjectionModel, snakeCaseMappers } = require('objection');

class Model extends ObjectionModel {
  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

module.exports = Model;
