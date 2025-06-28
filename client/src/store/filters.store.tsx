import { createWithSignal } from "solid-zustand";

interface CreditScoreState {
  creditScore: number | null;
  update: (val: number) => void;
}

interface IncomeState {
  income: number | null;
  update: (val: number) => void;
}

interface NumberOfCardsState {
  numberOfCards: number;
  update: (val: number) => void;
}

export const useCreditScoreStore = createWithSignal<CreditScoreState>(
  (set) => ({
    creditScore: null,
    update: (val: number) => set(() => ({ creditScore: val })),
  })
);

export const useIncomeStore = createWithSignal<IncomeState>((set) => ({
  income: null,
  update: (val: number) => set(() => ({ income: val })),
}));

export const useNumberOfCardsStore = createWithSignal<NumberOfCardsState>(
  (set) => ({
    numberOfCards: 1,
    update: (val: number) => set(() => ({ numberOfCards: val })),
  })
);
