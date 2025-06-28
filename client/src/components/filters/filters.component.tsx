import { Card, CardContent } from "../ui/card";
import { Filter } from "../ui/select";
import { NumberInput } from "../ui/number-field";
import { RadioButton } from "../ui/radio-group";

const creditScoreOptions: string[] = ["100", "200", "300", "400", "500"];

const incomeOptions: string[] = ["100", "200", "300", "400", "500"];

const cardTypes: string[] = [
  "Visa",
  "MasterCard",
  "American Express",
  "Diners Club",
];

export function Filters() {
  const handleChange = (val: string | null) => {
    // set in global state
  };

  return (
    <Card class="gap-1 py-3">
      <CardContent class="flex flex-row gap-4 items-center py-1">
        <Filter
          options={creditScoreOptions}
          placeholder="Credit Score"
          onChange={handleChange}
        />
        <Filter
          options={incomeOptions}
          placeholder="Income"
          onChange={handleChange}
        />
        <NumberInput min={1} max={10} defaultValue={5} />
      </CardContent>
      <CardContent class="flex flex-row gap-4 items-center py-1">
        <RadioButton radioGroupItems={cardTypes} />
      </CardContent>
    </Card>
  );
}
