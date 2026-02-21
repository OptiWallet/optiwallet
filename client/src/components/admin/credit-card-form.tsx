import { Dialog } from "@kobalte/core/dialog";
import { TextField } from "@kobalte/core/text-field";
import { Select } from "@kobalte/core/select";
import { createSignal, createResource, For, Index, Show } from "solid-js";
import type { CreditCard, CreateCreditCardInput, UpdateCreditCardInput } from "@/types/credit-card";
import type { Program } from "@/types/program";
import { formatDisplayName } from "@/libs/format";

interface CreditCardFormProps {
  card?: CreditCard;
  onSubmit: (data: CreateCreditCardInput | UpdateCreditCardInput) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

interface CashbackEntry {
  id: string;
  category: string;
  value: number;
}

const NETWORKS = ["visa", "mastercard", "american_express"];
const ISSUERS = [
  "scotiabank", "bmo", "td", "rbc", "cibc", "national_bank", "mbna",
  "desjardins", "american_express", "capital_one", "brim", "rogers",
  "tangerine", "wealthsimple", "simplii", "pc_financial", "neo",
  "vancity", "canadian_tire", "walmart", "home_trust", "koho"
];

const CASHBACK_CATEGORIES = [
  "groceries", "gas", "dining", "travel", "entertainment", 
  "drugstores", "transit", "recurring_bills", "everything_else"
];

const fetchPrograms = async (): Promise<Program[]> => {
  const response = await fetch("http://localhost:3001/api/programs");
  return response.json();
};

export const CreditCardForm = (props: CreditCardFormProps) => {
  const [programs] = createResource(fetchPrograms);
  const [name, setName] = createSignal(props.card?.name || "");
  const [issuer, setIssuer] = createSignal(props.card?.issuer || "");
  const [network, setNetwork] = createSignal(props.card?.network || "");
  const [minimumIncome, setMinimumIncome] = createSignal(props.card?.minimumIncome?.toString() || "");
  const [minimumCreditScore, setMinimumCreditScore] = createSignal(props.card?.minimumCreditScore?.toString() || "");
  const [programId, setProgramId] = createSignal(props.card?.programId || "");
  const [cashbackEntries, setCashbackEntries] = createSignal<CashbackEntry[]>(
    props.card?.cashback?.map(cb => ({ id: cb.id, category: cb.category, value: cb.value })) || []
  );

  const addCashbackEntry = () => {
    setCashbackEntries(prev => [...prev, { id: crypto.randomUUID(), category: "", value: 0 }]);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const cashback = cashbackEntries()
      .filter(entry => entry.category && entry.value > 0)
      .map(({ category, value }) => ({ category, value }));
    props.onSubmit({
      name: name(),
      issuer: issuer(),
      network: network(),
      minimumIncome: minimumIncome() ? parseInt(minimumIncome()) : null,
      minimumCreditScore: minimumCreditScore() ? parseInt(minimumCreditScore()) : null,
      programId: programId() || null,
      cashback: cashback.length > 0 ? cashback : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-4">
      <TextField value={name()} onChange={setName}>
        <TextField.Label class="text-sm font-medium">Card Name</TextField.Label>
        <TextField.Input
          class="w-full px-3 py-2 border rounded-md bg-background text-foreground"
          required
        />
      </TextField>

      <div>
        <label class="text-sm font-medium block mb-1">Issuer</label>
        <select
          value={issuer()}
          onChange={(e) => setIssuer(e.target.value)}
          class="w-full px-3 py-2 border rounded-md bg-background text-foreground"
          required
        >
          <option value="">Select issuer</option>
          <For each={ISSUERS}>
            {(iss) => <option value={iss}>{formatDisplayName(iss)}</option>}
          </For>
        </select>
      </div>

      <div>
        <label class="text-sm font-medium block mb-1">Network</label>
        <select
          value={network()}
          onChange={(e) => setNetwork(e.target.value)}
          class="w-full px-3 py-2 border rounded-md bg-background text-foreground"
          required
        >
          <option value="">Select network</option>
          <For each={NETWORKS}>
            {(net) => <option value={net}>{formatDisplayName(net)}</option>}
          </For>
        </select>
      </div>

      <TextField value={minimumIncome()} onChange={setMinimumIncome}>
        <TextField.Label class="text-sm font-medium">Minimum Income</TextField.Label>
        <TextField.Input
          type="number"
          class="w-full px-3 py-2 border rounded-md bg-background text-foreground"
        />
      </TextField>

      <TextField value={minimumCreditScore()} onChange={setMinimumCreditScore}>
        <TextField.Label class="text-sm font-medium">Minimum Credit Score</TextField.Label>
        <TextField.Input
          type="number"
          class="w-full px-3 py-2 border rounded-md bg-background text-foreground"
        />
      </TextField>

      <div>
        <label class="text-sm font-medium block mb-1">Program (Optional)</label>
        <select
          value={programId()}
          onChange={(e) => setProgramId(e.target.value)}
          class="w-full px-3 py-2 border rounded-md bg-background text-foreground"
        >
          <option value="">None</option>
          <Show when={programs()}>
            <For each={programs()}>
              {(prog) => <option value={prog.id}>{formatDisplayName(prog.program)}</option>}
            </For>
          </Show>
        </select>
      </div>

      <div>
        <div class="flex justify-between items-center mb-2">
          <label class="text-sm font-medium">Cashback Categories (Optional)</label>
          <button
            type="button"
            onClick={addCashbackEntry}
            class="text-sm px-2 py-1 border rounded hover:bg-muted"
          >
            + Add
          </button>
        </div>
        <div class="space-y-2">
          <Index each={cashbackEntries()} fallback={<div class="text-sm text-muted-foreground">No cashback categories added</div>}>
            {(entry, i) => (
              <div class="flex gap-2">
                <select
                  value={entry().category}
                  onChange={(e) => {
                    const id = entry().id;
                    const newCategory = e.currentTarget.value;
                    setCashbackEntries(prev => prev.map(item => item.id === id ? { ...item, category: newCategory } : item));
                  }}
                  class="flex-1 px-3 py-2 border rounded-md bg-background text-foreground"
                >
                  <option value="">Select category</option>
                  <For each={CASHBACK_CATEGORIES}>
                    {(cat) => <option value={cat}>{formatDisplayName(cat)}</option>}
                  </For>
                </select>
                <input
                  type="number"
                  placeholder="Value %"
                  value={entry().value}
                  onInput={(e) => {
                    const id = entry().id;
                    const newValue = parseFloat(e.currentTarget.value) || 0;
                    setCashbackEntries(prev => prev.map(item => item.id === id ? { ...item, value: newValue } : item));
                  }}
                  min="0.01"
                  max="100"
                  step="0.01"
                  class="w-24 px-3 py-2 border rounded-md bg-background text-foreground"
                />
                <button
                  type="button"
                  onClick={() => {
                    const id = entry().id;
                    setCashbackEntries(prev => prev.filter(item => item.id !== id));
                  }}
                  class="px-3 py-2 border rounded-md hover:bg-destructive hover:text-destructive-foreground"
                >
                  ×
                </button>
              </div>
            )}
          </Index>
        </div>
      </div>

      <div class="flex gap-2 justify-end">
        <button
          type="button"
          onClick={props.onCancel}
          class="px-4 py-2 border rounded-md hover:bg-muted"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={props.isSubmitting}
          class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 disabled:opacity-50"
        >
          {props.isSubmitting ? "Saving..." : props.card ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};
