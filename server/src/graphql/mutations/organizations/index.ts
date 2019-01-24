/* eslint-disable import/no-unresolved */
import createOrganization from './create/create.org.mutation';
import deleteOrganization from './delete/delete.org.mutation';
import restoreOrganization from './restore/restore.org.mutation';
import updateOrganization from './update/update.org.mutation';

export default {
  createOrganization,
  deleteOrganization,
  restoreOrganization,
  updateOrganization
};
