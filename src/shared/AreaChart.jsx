import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js/auto";
import moment from "moment";

const AreaChart = ({ data, label, colorCode }) => {

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [value, setValue] = useState([]);
  const [hour, setHour] = useState([]);
  const [xLabel, setXLabel] = useState();

  useEffect(() => 
  {
    const updatedHour = data.map((hourly) => 
    { 
      const hour = moment(hourly.time).format("LT");
      return hour;
    });

    const updatedValue = data.map((hourly) => 
    {
      if (label === "Temperature") {
        setXLabel("Temperature (°C)");
        return hourly.temp_c;
      }

      if (label === "Rain Chance") {
        setXLabel("Rain Chance (%)");
        return hourly.chance_of_rain;
      }

      return null
    });

    setValue(updatedValue);
    setHour(updatedHour);

  }, [data, label]);

  useEffect(() => 
  {
    if (chartInstanceRef.current) 
    {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    
    const newChartInstance = new Chart(ctx, {
      type: "line",
      data: 
        {
          labels: hour,
          datasets: 
          [
            {
              label: xLabel,
              data: value,
              borderColor: `rgba(${colorCode}, 1)`,
              backgroundColor: `rgba(${colorCode}, 0.2)`,
              fill: "start",
            },
          ],
        },
      options: 
      {
        responsive: true,
        maintainAspectRatio: false,
        plugins: 
        {
          tooltip: 
          {
            mode: "index",
            intersect: false,
          },
          legend: 
          {
            display: true,
            position: "top",
            labels: {
              color: "rgb(209,213,219)",
            },
          },
        },
        elements: 
        {
          line: { tension: 0 },
        },
        scales: 
        {
          x: 
          {
            type: "category",
            color: "rgb(209,213,219)",

            title: {
              display: false,
              text: "Hours",
              color: "rgb(209,213,219)",
            },
            ticks: {
              color: "rgb(209,213,219)",
            },
            grid: {
              display: false,
            },
          },
          y: 
          {
            title: {
              display: true,
              text: xLabel,
              color: "rgb(209,213,219)",
            },
            ticks: {
              color: "rgb(209,213,219)",
            },
            grid: {
              display: false,
            },
          },
        },
      },
    });
    chartInstanceRef.current = newChartInstance; 
  }, [data, value, hour, xLabel, colorCode]);

  return (
    <div className="flex justify-center rounded-lg backdrop-blur-lg bg-white/10 h-full w-full overflow-hidden ">
      <div className="flex-1 h-full w-full">
        <canvas className="p-3 " ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default AreaChart;
