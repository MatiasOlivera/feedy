const { Organization } = require('../../../models');

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
        organization: null,
        errors: null
      };
  } catch (err) {
    throw err;
  }

  try {
    await Organization.query().deleteById(args.id);

    return {
      operation: {
        status: true,
        message: 'The organization was deleted succesfully'
      },
      organization: org,
      errors: null
    };
  } catch (err) {
    throw err;
  }
};

module.exports = deleteOrganization;
