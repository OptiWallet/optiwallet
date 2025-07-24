import { and, AnyColumn, eq, OrderByOperators, SQLWrapper } from "drizzle-orm";
import { Filter, Sort } from "./types";

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
      .map((filter: Filter<T>) => {
        // if (filter.operator === "eq") {
        return eq(table[filter.field], filter.value);
        // } else if (filter.operator === "ne") {
        //   return not(eq(table[filter.field], filter.value));
        // } else if (filter.operator === "gt") {
        //   return gt(table[filter.field], filter.value);
        // } else if (filter.operator === "lt") {
        //   return lt(table[filter.field], filter.value);
        // } else if (filter.operator === "gte") {
        //   return gte(table[filter.field], filter.value);
        // } else if (filter.operator === "lte") {
        //   return lte(table[filter.field], filter.value);
        // } else if (filter.operator === "like") {
        //   return like(table[filter.field], `%${filter.value}%`);
        // }
        // return undefined;
      })
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
