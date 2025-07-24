import { and, type AnyColumn, eq, type OrderByOperators, type SQLWrapper } from "drizzle-orm";
import { type Filter, type Sort } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getFilterConditions = <T extends Record<string, any>>(
  filters?: Filter<T>[],
  table?: T
) => {
  if (!filters || !table) {
    return undefined;
  }
  return and(
    ...filters
      .map((filter: Filter<T>) => eq(table[filter.field], filter.value))
      .filter(
        (clause): clause is Exclude<typeof clause, undefined> =>
          clause !== undefined
      )
  );
};

export const getSortExpression = <T>(sort: Sort<T>) => {
  return (
    fields: Record<string, AnyColumn | SQLWrapper>,
    operators: OrderByOperators
  ) => {
    if (sort.order === "asc") {
      return operators.asc(fields[sort.field]);
    } else {
      return operators.desc(fields[sort.field]);
    }
  };
};
