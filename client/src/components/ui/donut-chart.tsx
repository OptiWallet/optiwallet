import { useIsMobile } from "@/store/window.store";
import { ApexOptions } from "apexcharts";
import { SolidApexCharts } from "solid-apexcharts";
import { Accessor, createEffect, createSignal, Show } from "solid-js";

type ChartProps = {
  series: Accessor<number[]>;
  labels: Accessor<string[]>;
};

export const DonutChart = (props: ChartProps) => {
  const { series, labels } = props;
  const isMobile = useIsMobile();

  // 1. Use a signal for options
  const [options, setOptions] = createSignal<ApexOptions>({
    labels: labels(),
    legend: {
      show: Boolean(labels()?.length),
      showForSingleSeries: true,
      position: "top"
    },
    colors: ["#0EB2FF", "#3083FF", "#9CA4F3", "#5B47FF", "#840EFF"],
    grid: {
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
    },
    plotOptions: {},
    dataLabels: {
      enabled: true,
      style: {
        fontSize: isMobile() ? "8px" : "16px",
        fontWeight: "regular",
        fontFamily: "Libertinus Math",
      },
      background: {
        padding: 0,
      },
      dropShadow: {
        enabled: true,
      },
    },
    tooltip: {
      enabled: false,
    },
  });

  createEffect(() => {
    setOptions((prev) => ({
      ...prev,
      labels: labels(),
      legend: { show: Boolean(labels()?.length) },
      dataLabels: {
        ...prev.dataLabels,
        style: {
          ...prev.dataLabels?.style,
          fontSize: isMobile() ? "8px" : "16px",
        },
      },
    }));
  });

  return (
    <>
      <Show when={series()?.length > 0}>
        <SolidApexCharts
          type="donut"
          width={isMobile() ? "350" : "500"}
          options={options()}
          series={series()}
        />
      </Show>
      <Show when={!series()?.length}>
        <div class={`w-[500px] align-middle`}>
          <h1 class="text-center">Please update spending</h1>
        </div>
      </Show>
    </>
  );
};
