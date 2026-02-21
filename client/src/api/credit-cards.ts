import { createMutation, createQuery } from "@tanstack/solid-query";
import type { CreditCard, CreateCreditCardInput, UpdateCreditCardInput } from "@/types/credit-card";
import { queryClient } from "@/libs/query-client";

const API_URL = "http://localhost:3001/api/credit-cards";

export const useCreditCards = () => {
  return createQuery(() => ({
    queryKey: ["credit-cards"],
    queryFn: async (): Promise<CreditCard[]> => {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch credit cards");
      return response.json();
    },
  }));
};

export const useCreateCreditCard = () => {
  return createMutation(() => ({
    mutationFn: async (data: CreateCreditCardInput): Promise<CreditCard> => {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create credit card");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credit-cards"] });
    },
  }));
};

export const useUpdateCreditCard = () => {
  return createMutation(() => ({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCreditCardInput }): Promise<CreditCard> => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update credit card");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credit-cards"] });
    },
  }));
};

export const useDeleteCreditCard = () => {
  return createMutation(() => ({
    mutationFn: async (id: string): Promise<void> => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete credit card");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credit-cards"] });
    },
  }));
};
