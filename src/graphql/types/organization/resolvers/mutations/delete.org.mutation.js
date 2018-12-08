const objection = require('objection');
const { knex } = require('../../../../../services/db.service');
const { ProductOwner, Organization } = require('../../../../../models');

const deleteOrganization = async (root, args) => {
  let org;
  try {
    org = await Organization.query().findById(args.id);

    if (!org)
      return {
        operation: {
          status: false,
          message: 'The organization does not exists'
        },
        organization: null
      };
  } catch (err) {
    throw err;
  }

  const tsx = await objection.transaction.start(knex);
  try {
    await ProductOwner.query(tsx).deleteById(args.id);
    await Organization.query(tsx).deleteById(args.id);
    await tsx.commit();

    org = await Organization.query().findById(args.id);

    return {
      operation: {
        status: true,
        message: 'The organization was deleted succesfully'
      },
      organization: org
    };
  } catch (err) {
    await tsx.rollback();
    throw err;
  }
};

module.exports = { Mutation: { deleteOrganization } };
