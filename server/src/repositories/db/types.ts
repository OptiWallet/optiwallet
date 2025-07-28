export type Filter<T> = {
  field: keyof T;
  value: string | number;
};
export type Sort<T> = {
  field: keyof T;
  order: SortDirection;
};
export enum SortDirection {
  asc = "asc",
  desc = "desc",
}
