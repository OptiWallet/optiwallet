import { Dialog } from "@kobalte/core/dialog";
import { createSignal, For, Show } from "solid-js";
import { useCreditCards, useCreateCreditCard, useUpdateCreditCard, useDeleteCreditCard } from "@/api/credit-cards";
import { CreditCardForm } from "@/components/admin/credit-card-form";
import type { CreditCard } from "@/types/credit-card";
import { FiEdit, FiTrash2, FiPlus } from "solid-icons/fi";
import { formatDisplayName } from "@/libs/format";

export const Admin = () => {
  const creditCards = useCreditCards();
  const createCard = useCreateCreditCard();
  const updateCard = useUpdateCreditCard();
  const deleteCard = useDeleteCreditCard();

  const [isCreateOpen, setIsCreateOpen] = createSignal(false);
  const [editingCard, setEditingCard] = createSignal<CreditCard | null>(null);
  const [deletingCard, setDeletingCard] = createSignal<CreditCard | null>(null);

  const handleCreate = async (data: any) => {
    await createCard.mutateAsync(data);
    setIsCreateOpen(false);
  };

  const handleUpdate = async (data: any) => {
    const card = editingCard();
    if (card) {
      await updateCard.mutateAsync({ id: card.id, data });
      setEditingCard(null);
    }
  };

  const handleDelete = async () => {
    const card = deletingCard();
    if (card) {
      await deleteCard.mutateAsync(card.id);
      setDeletingCard(null);
    }
  };

  return (
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold">Credit Card Management</h1>
        <button
          onClick={() => setIsCreateOpen(true)}
          class="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
        >
          <FiPlus /> Add Card
        </button>
      </div>

      <Show when={creditCards.isLoading}>
        <div class="text-center py-8">Loading...</div>
      </Show>

      <Show when={creditCards.isError}>
        <div class="text-center py-8 text-destructive">
          Error loading credit cards
        </div>
      </Show>

      <Show when={creditCards.data}>
        <Show 
          when={creditCards.data && creditCards.data.length > 0}
          fallback={
            <div class="text-center py-12 text-muted-foreground">
              No credit cards found. Click "Add Card" to create one.
            </div>
          }
        >
          <div class="grid gap-4">
            <For each={creditCards.data}>
              {(card) => (
              <div class="border rounded-lg p-4 bg-card">
                <div class="flex justify-between items-start">
                  <div class="space-y-2 flex-1">
                    <h3 class="text-xl font-semibold">{card.name}</h3>
                    <div class="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span class="text-muted-foreground">Issuer:</span>{" "}
                        <span>{formatDisplayName(card.issuer)}</span>
                      </div>
                      <div>
                        <span class="text-muted-foreground">Network:</span>{" "}
                        <span>{formatDisplayName(card.network)}</span>
                      </div>
                      <Show when={card.minimumIncome}>
                        <div>
                          <span class="text-muted-foreground">Min Income:</span>{" "}
                          ${card.minimumIncome?.toLocaleString()}
                        </div>
                      </Show>
                      <Show when={card.minimumCreditScore}>
                        <div>
                          <span class="text-muted-foreground">Min Credit Score:</span>{" "}
                          {card.minimumCreditScore}
                        </div>
                      </Show>
                      <Show when={card.programId}>
                        <div>
                          <span class="text-muted-foreground">Program:</span>{" "}
                          <span class="capitalize">{card.programId?.replace(/_/g, " ")}</span>
                        </div>
                      </Show>
                    </div>
                    <Show when={card.cashback && card.cashback.length > 0}>
                      <div class="mt-2 pt-2 border-t">
                        <div class="text-sm font-medium mb-1">Cashback:</div>
                        <div class="grid grid-cols-2 gap-1 text-xs">
                          <For each={card.cashback}>
                            {(cb) => (
                              <div>
                                {formatDisplayName(cb.category)}: {cb.value}%
                              </div>
                            )}
                          </For>
                        </div>
                      </div>
                    </Show>
                  </div>
                  <div class="flex gap-2">
                    <button
                      onClick={() => setEditingCard(card)}
                      class="p-2 hover:bg-muted rounded-md"
                      title="Edit"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => setDeletingCard(card)}
                      class="p-2 hover:bg-destructive hover:text-destructive-foreground rounded-md"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
        </Show>
      </Show>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen()} onOpenChange={setIsCreateOpen}>
        <Dialog.Portal>
          <Dialog.Overlay class="fixed inset-0 bg-black/50" />
          <div class="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Content class="bg-background border rounded-lg p-6 max-w-md w-full">
              <Dialog.Title class="text-2xl font-bold mb-4">Add Credit Card</Dialog.Title>
              <CreditCardForm
                onSubmit={handleCreate}
                onCancel={() => setIsCreateOpen(false)}
                isSubmitting={createCard.isPending}
              />
            </Dialog.Content>
          </div>
        </Dialog.Portal>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editingCard()} onOpenChange={(open) => !open && setEditingCard(null)}>
        <Dialog.Portal>
          <Dialog.Overlay class="fixed inset-0 bg-black/50" />
          <div class="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Content class="bg-background border rounded-lg p-6 max-w-md w-full">
              <Dialog.Title class="text-2xl font-bold mb-4">Edit Credit Card</Dialog.Title>
              <Show when={editingCard()}>
                {(card) => (
                  <CreditCardForm
                    card={card()}
                    onSubmit={handleUpdate}
                    onCancel={() => setEditingCard(null)}
                    isSubmitting={updateCard.isPending}
                  />
                )}
              </Show>
            </Dialog.Content>
          </div>
        </Dialog.Portal>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deletingCard()} onOpenChange={(open) => !open && setDeletingCard(null)}>
        <Dialog.Portal>
          <Dialog.Overlay class="fixed inset-0 bg-black/50" />
          <div class="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Content class="bg-background border rounded-lg p-6 max-w-md w-full">
              <Dialog.Title class="text-2xl font-bold mb-4">Delete Credit Card</Dialog.Title>
              <p class="mb-6">
                Are you sure you want to delete <strong>{deletingCard()?.name}</strong>?
                This action cannot be undone.
              </p>
              <div class="flex gap-2 justify-end">
                <button
                  onClick={() => setDeletingCard(null)}
                  class="px-4 py-2 border rounded-md hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteCard.isPending}
                  class="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:opacity-90 disabled:opacity-50"
                >
                  {deleteCard.isPending ? "Deleting..." : "Delete"}
                </button>
              </div>
            </Dialog.Content>
          </div>
        </Dialog.Portal>
      </Dialog>
    </div>
  );
};
