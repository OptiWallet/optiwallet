export type Filter<T> = {
  field: keyof T;
  // operator: FilterOperator;
  value: string | number;
};
export type Sort<T> = {
  field: keyof T;
  order: SortDirection;
};
// export enum FilterOperator {
//   eq = "eq",
//   ne = "ne",
//   gt = "gt",
//   lt = "lt",
//   gte = "gte",
//   lte = "lte",
//   like = "like",
// }
export enum SortDirection {
  asc = "asc",
  desc = "desc",
}
