import { DonutChart } from "@/components/ui/donut-chart";
import { useSpendingStore } from "@/store/spending.store";
import { categories, Spending } from "./spending";

export const SpendingChart = () => {
  const spending = useSpendingStore((state) => state.spending);
  const series: () => number[] = () =>
    Object.keys(spending)
      .filter(
        (key) =>
          spending[key as keyof typeof Spending] > 0 && categories.includes(key)
      )
      .map((key) => (spending[key as keyof typeof Spending] as number) || 0);
  const labels: () => string[] = () =>
    Object.keys(spending).filter(
      (key) =>
        spending[key as keyof typeof Spending] > 0 && categories.includes(key)
    );
  return (
    <>
      <DonutChart series={series} labels={labels} />
    </>
  );
};
