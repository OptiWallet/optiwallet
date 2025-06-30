import { Spending, useSpendingStore } from "@/store/spending.store";
import { Slider } from "../../components/ui/tw-slider";

export interface SliderProps {
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  label?: string;
}

export const SpendingSlider = (props: SliderProps) => {
  const { min = 0, max = 5000, value = 0, step = 50, label } = props;
  const spendingLabel = label as keyof Spending;
  const setSpending = useSpendingStore((state) => state.setSpending);
  const spending = useSpendingStore<Spending>((state) => state.spending);
  const initialSpendingValue = (spending[spendingLabel] as number) || value;

  const handleSliderInput = (val: number) => {
    setSpending(spendingLabel, val);
  };

  return (
    <Slider
      min={min}
      max={max}
      value={initialSpendingValue}
      step={step}
      label={label}
      onInput={handleSliderInput}
    />
  );
};
