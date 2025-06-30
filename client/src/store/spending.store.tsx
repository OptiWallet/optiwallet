import { createWithStore } from "solid-zustand";
import { persist } from "zustand/middleware";

export interface Spending {
  Groceries: number;
  Gas: number;
  Restaurants: number;
  Bills: number;
  Other: number;
}
export interface SpendingState {
  spending: Spending;
  setSpending: <K extends keyof Spending>(key: K, value: number) => void;
}

export const useSpendingStore = createWithStore<SpendingState>()(
  persist(
    (set, get) => ({
      spending: {
        Groceries: 300,
        Gas: 100,
        Restaurants: 100,
        Bills: 200,
        Other: 500,
      },
      setSpending: (key, value) =>
        set({
          ...get(),
          spending: {
            ...get().spending,
            [key]: value,
          }
        }),
    }),
    { name: "spending-store" }
  )
);
