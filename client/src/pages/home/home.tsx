import { Filters } from "@/components/filters/filters.component";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/store/window.store";
import { Spending } from "./spending";
import { SpendingChart } from "./spendingChart";

export const Home = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <div class="flex flex-col gap-2">
        <Filters />
        <div
          class={
            "flex justify-between gap-2" +
            (isMobile() ? " flex-col" : " flex-row")
          }
        >
          <Card class="w-full">
            <CardContent>
              <Spending />
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <SpendingChart />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
