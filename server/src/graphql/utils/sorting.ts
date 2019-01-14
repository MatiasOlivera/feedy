export function getSortingArguments<Enum extends string>(
  orderBy: OrderBy
): Enum {
  return (`${orderBy.field}_${orderBy.direction}` as unknown) as Enum;
}

interface OrderBy {
  field: string;
  direction: 'ASC' | 'DESC';
}
