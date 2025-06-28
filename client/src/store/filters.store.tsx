import { createWithSignal } from "solid-zustand";

interface FiltersState {
  creditScore: number | null;
  income: number | null;
  numberOfCards: number;
  setFilter: <K extends keyof Omit<FiltersState, "setField">>(
    key: K,
    value: FiltersState[K]
  ) => void;
}

export const useFiltersStore = createWithSignal<FiltersState>((set) => ({
  creditScore: null,
  income: null,
  numberOfCards: 1,
  setFilter: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),
}));
