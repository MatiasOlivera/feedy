export function getDeletedArgument(deleted: boolean): Deleted {
  return deleted ? { deletedAt_not: null } : { deletedAt: null };
}

interface Deleted {
  [key: string]: null;
}
