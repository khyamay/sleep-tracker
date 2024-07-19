import { useQuery } from "@tanstack/react-query";
import ReactECharts from "echarts-for-react";
import { useMemo } from "react";

import { getUserEntries } from "@/api/sleepEntryApi";

import { ISleepChart } from "@/types/schemas";
import { SleepChartProps } from "@/types/types";

const UserSleepChart = ({ userName }: SleepChartProps) => {
  const { data, isLoading, error } = useQuery<ISleepChart[]>({
    queryKey: ["sleepChartData", userName],
    queryFn: () => getUserEntries(userName)
  });

  const chartOption = useMemo(() => {
    if (!data) return {};

    const dates = data.map((entry) =>
      new Date(entry.entryDate).toLocaleDateString()
    );
    const sleepDurations = data.map((entry) => entry.sleepDuration);

    return {
      title: {
        text: `${userName}'s Sleep Duration`,
        left: "center"
      },
      tooltip: {
        trigger: "axis"
      },
      xAxis: {
        type: "category",
        data: dates
      },
      yAxis: {
        type: "value",
        name: "Sleep Duration (hours)"
      },
      series: [
        {
          data: sleepDurations,
          type: "line",
          smooth: true
        }
      ]
    };
  }, [data, userName]);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <ReactECharts
      option={chartOption}
      style={{ height: "450px", width: "100%" }}
    />
  );
};

export default UserSleepChart;
