import { Card, CardContent } from "../ui/card";
import { Filter } from "../ui/select";
import { NumberInput } from "../ui/number-field";
import { RadioButton } from "../ui/radio-group";
import { useFiltersStore } from "@/store/filters.store";

const creditScoreOptions: string[] = ["100", "200", "300", "400", "500"];

const incomeOptions: string[] = ["100", "200", "300", "400", "500"];

const cardTypes: string[] = [
  "Visa",
  "MasterCard",
  "American Express",
  "Diners Club",
];

const setFilter = useFiltersStore((state) => state.setFilter);

const CreditScore = () => {
  const setCreditScore = (val: number) => {
    setFilter("creditScore", val);
  };

  return (
    <Filter
      options={creditScoreOptions}
      placeholder="Credit Score"
      onChange={setCreditScore}
    />
  );
};

const Income = () => {
  const setIncome = (val: number) => {
    setFilter("income", val);
  };

  return (
    <Filter options={incomeOptions} placeholder="Income" onChange={setIncome} />
  );
};

const NumberOfCards = () => {
  const setNumberOfCards = (val: number) => {
    setFilter("numberOfCards", val);
  };

  return (
    <NumberInput
      min={1}
      max={10}
      defaultValue={5}
      onChange={setNumberOfCards}
    />
  );
};

export function Filters() {
  return (
    <Card class="gap-1 py-3">
      <CardContent class="flex flex-row gap-4 items-center py-1">
        <CreditScore />
        <Income />
        <NumberOfCards />
      </CardContent>
      <CardContent class="flex flex-row gap-4 items-center py-1">
        {/* we need to change to multiple choice and create store */}
        <RadioButton radioGroupItems={cardTypes} />{" "}
      </CardContent>
    </Card>
  );
}
