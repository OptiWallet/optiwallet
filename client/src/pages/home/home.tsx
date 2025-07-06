import { Filters } from "@/components/filters/filters.component";
import { Card, CardContent } from "@/components/ui/card";
import { DonutChart } from "@/components/ui/chart";
import { useSpendingStore } from "@/store/spending.store";
import { categories, Spending } from "./spending";
import { useIsMobile } from "@/store/window.store";

export const Home = () => {
  const isMobile = useIsMobile();
  const spending = useSpendingStore((state) => state.spending);
  const series: () => number[] = () =>
    Object.keys(spending)
      .filter((key) =>  spending[key as keyof typeof Spending] > 0 && categories.includes(key))
      .map((key) => (spending[key as keyof typeof Spending] as number) || 0);
  const labels = () =>
    Object.keys(spending).filter((key) => spending[key as keyof typeof Spending] > 0 && categories.includes(key));

  return (
    <>
      <div class="flex flex-col gap-2">
        <Filters />
        <div
          class={
            "flex justify-between gap-2" 
            +(isMobile() ? " flex-col" : " flex-row")
          }
        >
          <Card class="w-full">
            <CardContent>
              <Spending />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <DonutChart series={series} labels={labels} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
