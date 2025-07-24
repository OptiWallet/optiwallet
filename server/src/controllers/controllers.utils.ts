import { Filter, Sort, SortDirection } from "../repositories/db/types";

export const extractFilters = <T>(
  query: Record<string, string | number>
): Filter<T>[] => {
  const filters: Filter<T>[] = [];
  Object.entries(query)
  .filter(([key]) => (!["sortField","sortOrder"].includes(key)))
  .forEach(([key, value]) => {       
    filters.push({
      field: key as keyof T,
      value,
    });
  });
  return filters;
};

export const extractSort = <T>(
  query: Record<string, string | number>
): Sort<T> | undefined => {
  const sort = {} as Sort<T>;
  Object.entries(query).forEach(([key, value]) => {
    switch (key) {
      case "sortField":
        sort.field = value as keyof T;
        break;
      case "sortOrder":
        sort.order = value as SortDirection;
        break;
    }
  });
  return sort.field ? sort : undefined;
};
