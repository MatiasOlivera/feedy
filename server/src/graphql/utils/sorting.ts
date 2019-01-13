export function getSortingArguments<Enum>(
  args: Args,
  defaultOrder: OrderBy
): Enum {
  const userField = args.orderBy && args.orderBy.field;
  const field = userField || defaultOrder.field;

  const userDirection = args.orderBy && args.orderBy.direction;
  const direction =
    userDirection || (userField ? 'ASC' : defaultOrder.direction);

  return (`${field}_${direction}` as unknown) as Enum;
}

type Args = {
  orderBy: OrderBy;
};

interface OrderBy {
  field: string;
  direction: 'ASC' | 'DESC';
}
