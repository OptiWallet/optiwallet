export interface Cashback {
  id: string;
  category: string;
  value: number;
}

export interface CreditCard {
  id: string;
  name: string;
  issuer: string;
  network: string;
  minimumIncome: number | null;
  minimumCreditScore: number | null;
  programId: string | null;
  cashback?: Cashback[];
}

export interface CreateCreditCardInput {
  name: string;
  issuer: string;
  network: string;
  minimumIncome?: number | null;
  minimumCreditScore?: number | null;
  programId?: string | null;
  cashback?: Array<{ category: string; value: number }>;
}

export interface UpdateCreditCardInput extends Partial<CreateCreditCardInput> {}
