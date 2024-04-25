import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { memo, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { Divider } from "@mui/material";

function WorkfolioGraph({ user }) {
  const vals = {
    uniqueVisitors: 46085,
    series: [`${user?.likes}`, `${user.searchCount}`],
    labels: ["Likes", "Searches"],
  };
  const { series, labels, uniqueVisitors } = vals;
  const [awaitRender, setAwaitRender] = useState(true);
  const theme = useTheme();

  const chartOptions = {
    chart: {
      animations: {
        speed: 400,
        animateGradually: {
          enabled: false,
        },
      },
      fontFamily: "inherit",
      foreColor: "inherit",
      height: "130%",
      type: "donut",
      sparkline: {
        enabled: true,
      },
    },
    colors: ["#199ce0", "#d9241c"],
    bgColors: ["#d3f0ff", "#ffe3e2"],
    labels,
    plotOptions: {
      pie: {
        customScale: 0.9,
        expandOnClick: false,
        donut: {
          size: "80%",
          labels: {
            show: true,
            name: {
              type: "none",
            },
            value: {
              type: "none",
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
              },
            },
          },
        },
      },
    },
    stroke: {
      colors: [theme.palette.background.paper],
    },
    series,
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        filter: {
          type: "none",
        },
      },
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: false,
      theme: "dark",
      custom: ({ seriesIndex, w }) =>
        `<div class="flex items-center h-8 min-h-8 max-h-8 px-12">
            <div class="w-4 h-4 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
            <div class="ml-8 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
            <div class="ml-8 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
        </div>`,
    },
  };

  useEffect(() => {
    setAwaitRender(false);
  }, []);

  if (awaitRender) {
    return null;
  }
  return (
    <Paper className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden  ">
      <div className="flex flex-col sm:flex-row items-center justify-center  p-8">
        <Typography className="!text-[2rem] font-medium tracking-tight leading-6 truncate">
          Workfolio Graph
        </Typography>
      </div>
      <Divider />

      <div className="flex space-x-3 items-center justify-center  p-8">
        <Typography
          className="!text-xl font-bold tracking-tight leading-6 truncate mr-8"
          color="text.secondary"
        >
          Total Likes:
        </Typography>
        <Typography
          className="!text-2xl font-bold tracking-tight leading-6 truncate"
          color="#3a98c9"
        >
          {user?.likes}
        </Typography>
      </div>

      <div className="flex flex-col flex-auto  h-192 p-16 pt-0 pb-0">
        <ReactApexChart
          className="flex flex-auto items-center justify-center w-full h-full"
          options={chartOptions}
          series={series}
          type={chartOptions.chart.type}
          height={chartOptions.chart.height}
        />
      </div>
      <div className="mt-32 p-8 pt-0">
        <div className="-my-12 divide-y">
          {series.map((dataset, i) => (
            <div
              className="grid grid-cols-2 py-3 rounded-full px-16 mb-8"
              key={i}
              style={{ backgroundColor: chartOptions.bgColors[i] }}
            >
              <div className="flex space-x-3 items-center">
                <Box
                  className="flex-0 w-4 h-4 rounded-full"
                  sx={{ backgroundColor: chartOptions.colors[i] }}
                />
                <Typography className="ml-12 truncate">{labels[i]}</Typography>
              </div>

              <Typography
                className="text-right items-end justify-end align-end"
                color="text.secondary"
              >
                {dataset}%
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </Paper>
  );
}

export default memo(WorkfolioGraph);
