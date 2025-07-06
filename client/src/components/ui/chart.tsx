import { useIsMobile } from "@/store/window.store";
import { ApexOptions } from "apexcharts";
import { SolidApexCharts } from "solid-apexcharts";
import { Accessor, createEffect, createSignal } from "solid-js";

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
    <SolidApexCharts
      type="donut"
      width={isMobile() ? "350" : "500"}
      options={options()}
      series={series()}
    />
  );
};
