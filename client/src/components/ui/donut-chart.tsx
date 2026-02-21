import { useIsDarkMode, useIsMobile } from "@/store/window.store";
import { ApexOptions } from "apexcharts";
import { SolidApexCharts } from "solid-apexcharts";
import { Accessor, createMemo, Show } from "solid-js";

type ChartProps = {
  series: Accessor<number[]>;
  labels: Accessor<string[]>;
};

export const DonutChart = (props: ChartProps) => {
  const { series, labels } = props;
  const isMobile = useIsMobile();
  const isDarkMode = useIsDarkMode();

  const options = createMemo<ApexOptions>(() => {
    const darkMode = isDarkMode();
    const mobile = isMobile();
    const currentLabels = labels();
    const textColor = darkMode ? "#FFFFFF" : "#000000";

    const chartColors = ["#0EB2FF", "#3083FF", "#9CA4F3", "#5B47FF", "#840EFF"];

    return {
      chart: {
        background: "transparent",
      },
      theme: {
        mode: darkMode ? "dark" : "light",
      },
      labels: currentLabels,
      legend: {
        show: Boolean(currentLabels?.length),
        showForSingleSeries: true,
        position: "top",
        labels: {
          colors: textColor,
        },
      },
      colors: chartColors,
      grid: {
        padding: { top: 0, right: 0, bottom: 0, left: 0 },
      },
      plotOptions: {},
      dataLabels: {
        enabled: true,
        style: {
          fontSize: mobile ? "8px" : "16px",
          fontWeight: "regular",
          fontFamily: "Libertinus Math",
          colors: ["#FFFFFF"],
        },
        background: {
          padding: 0,
        },
        dropShadow: {
          enabled: true,
        },
      },
      tooltip: {
        enabled: true,
        theme: darkMode ? "dark" : "light",
      },
    };
  });

  return (
    <>
      <Show when={series()?.length > 0}>
        <SolidApexCharts
          key={isDarkMode() ? "dark" : "light"}
          type="donut"
          width={isMobile() ? "350" : "500"}
          options={options()}
          series={series()}
        />
      </Show>
      <Show when={!series()?.length}>
        <div class="w-125 align-middle">
          <h1 class="text-center">Please update spending</h1>
        </div>
      </Show>
    </>
  );
};
