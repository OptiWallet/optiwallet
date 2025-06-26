import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/tw-slider";
import { For } from "solid-js";

const getSlider = (label: string) => {
  return <Slider step={50} max={5000} min={0} label={label} />;
};

const categories = ["Travel", "Food", "Entertainment", "Bills", "Gas", "Other"];

export const Usage = () => {
  return (
    <Card>
      <CardContent>
        <span class="text-lg font-semibold mb-2">Usage</span>
        <For each={categories}>{(category) => getSlider(category)}</For>
      </CardContent>
    </Card>
  );
};
